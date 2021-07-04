import { Get } from '@nestjs/common';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuard } from './auth/guards/roles.guard';
import { CredentialsDto } from './credentials.dto';
import { ADMIN, USER } from './entity/constans';
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

  @Post('get-all')
  async getAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('generate-key-pair')
  async generateKeyPair(@Req() { user }: { user: UserDto }) {
    return user;
  }

  @Roles(ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin-endpoint')
  async onlyAdmin() {
    return 'Only ADMIN can access this endpoint';
  }

  @Roles(ADMIN, USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('user-endpoint')
  async onlyAdminAndUser() {
    return 'Only USER, ADMIN can access this endpoint';
  }
}
