import { PickType } from '@nestjs/mapped-types';

export class GameMessageDto {
  room: string;
  message: string;
}

export class GameRoomDto extends PickType(GameMessageDto, ['room'] as const) {}
