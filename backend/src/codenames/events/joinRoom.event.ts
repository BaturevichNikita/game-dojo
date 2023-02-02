import { CodenamesEvent } from '../codenames.events';
import { CodenamesService } from '../codenames.service';
import { CodenamesTeams } from '../entities/codenames.entity';

export type JoinRoomEventPayload = {
  id: string;
  room: string;
  nickname: string;
  team: CodenamesTeams;
};

export class JoinRoomEvent implements CodenamesEvent {
  private readonly codenamesService: CodenamesService;
  private payload: JoinRoomEventPayload;
  readonly createdAt: string;

  constructor(codenamesService: CodenamesService, payload: JoinRoomEventPayload) {
    console.log('Create JoinRoomEvent with payload:', payload);

    this.codenamesService = codenamesService;
    this.payload = payload;
    this.createdAt = new Date().toISOString();
  }
  handle() {
    console.log('Handle JoinRoomEvent');
    this.codenamesService.joinPlayerToRoom(
      this.payload.room,
      this.payload.id,
      this.payload.nickname,
      this.payload.team,
    );
  }
}
