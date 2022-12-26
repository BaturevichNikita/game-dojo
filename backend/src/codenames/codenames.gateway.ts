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
import { GamesService } from 'src/games/games.service';
import { GameMessageDto, GameRoomDto } from './dto/game.dto';

enum WSEvents {
  CONNECT = 'clientConnected',
  DISCONNECT = 'clientConnected',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  MESSAGE = 'message',
}

const rooms = [];
@WebSocketGateway({
  namespace: '/codenames',
  cors: {
    origin: '*',
  },
})
export class CodenamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gamesService: GamesService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);
  }

  @SubscribeMessage(WSEvents.JOIN_ROOM)
  handleJoinRoom(@MessageBody() { room }: GameRoomDto, @ConnectedSocket() client: Socket) {
    client.join(room);
    console.log(`${client.id} joined to ${room}!`);
    rooms.push(room);
    const state = this.gamesService.getStateByRoomCode(room);
    client.emit(WSEvents.JOIN_ROOM, { state });
  }

  @SubscribeMessage(WSEvents.LEAVE_ROOM)
  handleLeaveRoom(@MessageBody() { room }: GameRoomDto, @ConnectedSocket() client: Socket) {
    client.leave(room);
    console.log(`${client.id} leaved from ${room}!`);
    client.emit(WSEvents.LEAVE_ROOM, { room });
  }

  @SubscribeMessage(WSEvents.MESSAGE)
  handleMessage(@MessageBody() { room, message }: GameMessageDto, @ConnectedSocket() client: Socket) {
    console.log({ room, message });
    console.log({ clientRooms: client.rooms });
    this.server.to(room).emit(WSEvents.MESSAGE, { message });
  }
}
