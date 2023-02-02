import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsExceptionFilter } from 'src/filter/websocketExceptionFilter';
import { CodenamesEventList, CodenamesEvents } from './codenames.events';
import { CodenamesService } from './codenames.service';
import { EventsDto, JoinRoomDto, LeftRoomDto, MessageToRoomDto } from './dto/codenames.dto';

enum WSEvents {
  CONNECT = 'clientConnected',
  DISCONNECT = 'clientConnected',
  JOIN_ROOM = 'joinRoom',
  JOINED_ROOM = 'joinedRoom',
  LEAVE_ROOM = 'leaveRoom',
  LEFT_ROOM = 'leftRoom',
  MESSAGE = 'message',
  EVENTS = 'events',
}

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  namespace: '/codenames',
  cors: {
    origin: '*',
  },
})
export class CodenamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly codenamesService: CodenamesService, private readonly codenamesEvents: CodenamesEvents) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    const event = this.codenamesEvents.createNewEvent(CodenamesEventList.LEAVE_ROOM, {
      id: client.id,
    });
    this.codenamesEvents.handleEvent(event);
    console.log(`${client.id} disconnected!`);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(WSEvents.JOIN_ROOM)
  handleJoinRoom(@MessageBody() { room, team, nickname }: JoinRoomDto, @ConnectedSocket() client: Socket) {
    const event = this.codenamesEvents.createNewEvent(CodenamesEventList.JOIN_ROOM, {
      room,
      team,
      nickname,
      id: client.id,
    });
    this.codenamesEvents.handleEvent(event);
    client.join(room);

    console.log(`${client.id} joined to ${room} ROOM!`);

    const state = this.codenamesService.getStateForRoom(room);
    client.emit(WSEvents.JOINED_ROOM, { state });
  }

  @SubscribeMessage(WSEvents.LEAVE_ROOM)
  handleLeaveRoom(@MessageBody() { room }: LeftRoomDto, @ConnectedSocket() client: Socket) {
    const event = this.codenamesEvents.createNewEvent(CodenamesEventList.LEAVE_ROOM, {
      id: client.id,
    });
    this.codenamesEvents.handleEvent(event);
    client.leave(room);
    console.log(`${client.id} leaved from ${room}!`);
    client.emit(WSEvents.LEFT_ROOM, { room });
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(WSEvents.MESSAGE)
  handleMessage(@MessageBody() { room, message }: MessageToRoomDto, @ConnectedSocket() client: Socket) {
    console.log({ room, message });
    console.log({ clientRooms: client.rooms });
    this.server.to(room).emit(WSEvents.MESSAGE, { message });
  }

  @SubscribeMessage(WSEvents.EVENTS)
  handleEvents(@MessageBody() { eventType, payload }: EventsDto, @ConnectedSocket() client: Socket) {
    console.log({ eventType, payload });
    const room = [...client.rooms].pop();

    const event = this.codenamesEvents.createNewEvent(eventType, { room, ...payload });
    this.codenamesEvents.handleEvent(event);

    const state = this.codenamesService.getStateForRoom(room);
    this.server.to(room).emit(WSEvents.EVENTS, { state });
  }
}
