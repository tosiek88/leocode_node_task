import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ADMIN, USER } from 'src/entity/constans';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('api/')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  async findAll(): Promise<UserDto[]>{
    return await this.userService.getAll();
  }

  @Get('users/:email')
  async findByEmail(@Param('email') email) {
    return await this.userService.findByEmail(email);
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
