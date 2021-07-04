import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { EncryptModule } from './encrypt/encrypt.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule, EncryptModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
