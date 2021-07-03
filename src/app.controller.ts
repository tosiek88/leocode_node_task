import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { CredentialsDto } from './credentials.dto';

@Controller('api/')
export class AppController {
  @Post('sign-in')
  async signIn(@Body() signIn: CredentialsDto) {
    console.debug(signIn);
    return {
      authToken: '',
    };
  }
}
