import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryInMemoryService } from './repository-in-memory/repository-in-memory.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RepositoryInMemoryService],
})
export class AppModule {}
