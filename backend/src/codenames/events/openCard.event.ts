import { CodenamesEvent } from '../codenames.events';
import { CodenamesService } from '../codenames.service';

export type OpenCardEventPayload = {
  room: string;
  card: string;
};

export class OpenCardEvent implements CodenamesEvent {
  private readonly codenamesService: CodenamesService;
  private payload: OpenCardEventPayload;
  readonly createdAt: string;

  constructor(codenamesService: CodenamesService, payload: OpenCardEventPayload) {
    console.log('Create OpenCardEvent with payload:', payload);

    this.codenamesService = codenamesService;
    this.payload = payload;
    this.createdAt = new Date().toISOString();
  }
  handle() {
    console.log('Handle OpenCardEvent');
    this.codenamesService.openCardInRoom(this.payload.room, this.payload.card);
  }
}
