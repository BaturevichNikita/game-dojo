import { CodenamesEvent } from '../codenames.events';
import { CodenamesService } from '../codenames.service';

export type StartGameEventPayload = {
  room: string;
};

export class StartGameEvent implements CodenamesEvent {
  private readonly codenamesService: CodenamesService;
  private payload: StartGameEventPayload;
  readonly createdAt: string;

  constructor(codenamesService: CodenamesService, payload: StartGameEventPayload) {
    console.log('Create StartGameEvent with payload:', payload);

    this.codenamesService = codenamesService;
    this.payload = payload;
    this.createdAt = new Date().toISOString();
  }
  handle() {
    console.log('Handle StartGameEvent');
    this.codenamesService.startNewGame(this.payload.room);
  }
}
