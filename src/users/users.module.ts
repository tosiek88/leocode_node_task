import { Module } from '@nestjs/common';
import { InMemoryUserRepository } from 'src/in-memory-repository/user/in-memory.repository';
import { UsersService } from './users.service';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { UserProfile } from 'src/profiles/user.profile';
import { UsersController } from './users.controller';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [{ name: 'user', pluginInitializer: classes }],
      singular: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, InMemoryUserRepository, UserProfile],
  exports: [UsersService],
})
export class UsersModule {}
