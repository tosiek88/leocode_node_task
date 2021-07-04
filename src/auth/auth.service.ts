import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './types/jwt.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn({ email }: CredentialsDto) {
    const payload: JwtPayload = { email };
    const authToken = this.jwtService.sign(payload);
    this.usersService.setTokenForUser(email, authToken);
    return { authToken };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!(user && (await bcrypt.compare(pass, user.password)))) {
      throw new UnauthorizedException('Please check your login');
    }
    const { password, ...result } = user;
    return result;
  }
}
