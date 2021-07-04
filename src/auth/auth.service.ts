import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from 'src/credentials.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './types/jwt.interface';

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
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
