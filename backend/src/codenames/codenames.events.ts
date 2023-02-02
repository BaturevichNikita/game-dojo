import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { CodenamesService } from './codenames.service';
import { JoinRoomEvent, JoinRoomEventPayload } from './events/joinRoom.event';
import { LeaveRoomEvent, LeaveRoomEventPayload } from './events/leaveRoom.event';
import { OpenCardEvent, OpenCardEventPayload } from './events/openCard.event';
import { StartGameEvent, StartGameEventPayload } from './events/startGame.event';

export interface CodenamesEvent {
  readonly createdAt: string;
  handle: () => void;
}

export enum CodenamesEventList {
  START_GAME = 'startGame',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  OPEN_CARD = 'openCard',
}

@Injectable()
export class CodenamesEvents {
  private events: CodenamesEvent[] = [];

  constructor(private readonly codenamesService: CodenamesService) {}

  createNewEvent(eventType: CodenamesEventList, payload?: Record<string, unknown>): CodenamesEvent {
    switch (eventType) {
      case CodenamesEventList.START_GAME:
        return new StartGameEvent(this.codenamesService, payload as StartGameEventPayload);
      case CodenamesEventList.JOIN_ROOM:
        return new JoinRoomEvent(this.codenamesService, payload as JoinRoomEventPayload);
      case CodenamesEventList.LEAVE_ROOM:
        return new LeaveRoomEvent(this.codenamesService, payload as LeaveRoomEventPayload);
      case CodenamesEventList.OPEN_CARD:
        return new OpenCardEvent(this.codenamesService, payload as OpenCardEventPayload);
      default:
        throw new WsException(`There is no event handler for ${eventType} event!`);
    }
  }

  handleEvent(event: CodenamesEvent): void {
    event.handle();
    this.events.push(event);
  }

  runAllEvents(): void {
    for (const event of this.events) {
      event.handle();
    }
  }

  printRoomEvents(room: string): void {
    for (const event of this.events) {
      event.handle();
    }
  }
}
