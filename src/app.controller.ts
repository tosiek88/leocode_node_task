import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { CredentialsDto } from './credentials.dto';
import { UserDto } from './users/user.dto';
import { UsersService } from './users/users.service';

@Controller('api/')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('generate-key-pair')
  async generateKeyPair(@Req() { user }: { user: UserDto }) {
    return this.userService.generateKeyPairForUser(user.id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('encrypt')
  async encrypt(@Req() { user }: { user: UserDto }) {
    return '';
  }
}
