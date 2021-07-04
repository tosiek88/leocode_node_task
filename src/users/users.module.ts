import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { EncryptModule } from '../encrypt/encrypt.module';
import { InMemoryUserRepository } from '../in-memory-repository/user/in-memory.repository';
import { UserProfile } from './profiles/user.profile';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'user', pluginInitializer: classes }],
      singular: true,
    }),
    EncryptModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUserRepository, UserProfile],
  exports: [UsersService],
})
export class UsersModule {}
