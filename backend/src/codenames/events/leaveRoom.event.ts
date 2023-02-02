import { CodenamesEvent } from '../codenames.events';
import { CodenamesService } from '../codenames.service';

export type LeaveRoomEventPayload = {
  id: string;
};

export class LeaveRoomEvent implements CodenamesEvent {
  private readonly codenamesService: CodenamesService;
  private payload: LeaveRoomEventPayload;
  readonly createdAt: string;

  constructor(codenamesService: CodenamesService, payload: LeaveRoomEventPayload) {
    console.log('Create LeaveRoomEvent with payload:', payload);

    this.codenamesService = codenamesService;
    this.payload = payload;
    this.createdAt = new Date().toISOString();
  }
  handle() {
    console.log('Handle LeaveRoomEvent');
    this.codenamesService.leavePlayerFromRoom(this.payload.id);
  }
}
