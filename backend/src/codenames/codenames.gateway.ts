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
import { CodenamesService } from './codenames.service';
import { JoinRoomDto, LeftRoomDto, MessageToRoomDto } from './dto/codenames.dto';

enum WSEvents {
  CONNECT = 'clientConnected',
  DISCONNECT = 'clientConnected',
  JOIN_ROOM = 'joinRoom',
  JOINED_ROOM = 'joinedRoom',
  LEAVE_ROOM = 'leaveRoom',
  LEFT_ROOM = 'leftRoom',
  MESSAGE = 'message',
}

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  namespace: '/codenames',
  cors: {
    origin: '*',
  },
})
export class CodenamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly codenamesService: CodenamesService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(WSEvents.JOIN_ROOM)
  handleJoinRoom(@MessageBody() { room, team, nickname }: JoinRoomDto, @ConnectedSocket() client: Socket) {
    const state = this.codenamesService.joinPlayerToRoom(room, client.id, nickname, team);
    client.join(room);
    console.log(`${client.id} joined to ${room}!`);
    client.emit(WSEvents.JOINED_ROOM, { state });
  }

  @SubscribeMessage(WSEvents.LEAVE_ROOM)
  handleLeaveRoom(@MessageBody() { room }: LeftRoomDto, @ConnectedSocket() client: Socket) {
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
}
