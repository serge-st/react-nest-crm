import { Module } from '@nestjs/common';
import { AppRoutesService } from './approutes.service';
import { AppRoutesController } from './approutes.controller';

@Module({
  providers: [AppRoutesService],
  controllers: [AppRoutesController]
})
export class AppRoutesModule {}
