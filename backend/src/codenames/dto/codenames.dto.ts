import { PickType } from '@nestjs/mapped-types';
import { IsEnum, IsString } from 'class-validator';
import { CodenamesTeams } from '../entities/codenames.entity';

export class CodenamesDto {
  team: CodenamesTeams;
  nickname: string;
  room: string;
  message: string;
}

export class LeftRoomDto extends PickType(CodenamesDto, ['room'] as const) {}
export class MessageToRoomDto extends PickType(CodenamesDto, ['room', 'message'] as const) {}

export class JoinRoomDto {
  @IsEnum(CodenamesTeams)
  team: CodenamesTeams;

  @IsString()
  nickname: string;

  @IsString()
  room: string;
}
