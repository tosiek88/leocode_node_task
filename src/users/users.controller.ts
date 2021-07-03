import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('users')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('users/:email')
  async findByEmail(@Param('email') email) {
    return await this.userService.findByEmail(email);
  }
}
