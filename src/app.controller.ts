import { Body } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './credentials.dto';
import { UserDto } from './users/user.dto';

@Controller('api/')
export class AppController {
  @Post('sign-in')
  async signIn(@Body() signIn: CredentialsDto) {
    console.debug(signIn);
    return {
      authToken: '',
    };
  }

  @Post('/api/generate-key-pair')
  async generateKeyPair(@Req() { user }: { user: UserDto }) {
    return user;
  }
}
