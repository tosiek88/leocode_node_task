import { Injectable, NotFoundException } from '@nestjs/common';
import { ADMIN, USER } from 'src/entity/constans';
import { User } from 'src/entity/user';

@Injectable()
export class InMemoryUserRepository {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: '$2b$10$NVZuUn6qxpPtmHkLDHxQzetkKgT4Oopi87KOQJcZFFrOm0LdYtWae', //encrypted and salted password 1234
      role: 'ADMIN',
      token: '',
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: '$2b$10$bZojqhcDXWZIcfmRD6d9S.mG3hr5oxpM25BTXg35fXJX422NBhnn.', //encrypted and salted password 4321
      role: 'USER',
      token: '',
    },
  ];

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async setTokenForUser(email: string, token: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(email);
    }
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = { ...this.users[index], token: token };
  }
}
