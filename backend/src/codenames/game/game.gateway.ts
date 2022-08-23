import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { Server, Socket } from 'socket.io';
import { GameMessageDto, GameRoomDto } from './dto/game.dto';

@WebSocketGateway({ namespace: '/codenames' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    console.log(`${client.id} connected!`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected!`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() { room }: GameRoomDto, @ConnectedSocket() client: Socket) {
    client.join(room);
    console.log(`${client.id} joined to ${room}!`);
    client.emit('joinedRoom', { room });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(@MessageBody() { room }: GameRoomDto, @ConnectedSocket() client: Socket) {
    client.leave(room);
    console.log(`${client.id} leaved from ${room}!`);
    client.emit('leavedRoom', { room });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() { room, message }: GameMessageDto, @ConnectedSocket() client: Socket) {
    console.log({ room, message });
    console.log({ clientRooms: client.rooms });
    this.server.to(room).emit('messageToClient', { message });
  }
}
