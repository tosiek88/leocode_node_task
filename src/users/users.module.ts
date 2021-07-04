import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from 'src/in-memory-repository/user/in-memory.repository';
import { UsersService } from './users.service';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { UsersController } from './users.controller';
import { UserProfile } from './profiles/user.profile';
import { EncryptModule } from 'src/encrypt/encrypt.module';

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
