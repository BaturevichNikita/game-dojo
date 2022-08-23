import { Module } from '@nestjs/common';
import { CodenamesModule } from './codenames/codenames.module';

@Module({
  imports: [CodenamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
