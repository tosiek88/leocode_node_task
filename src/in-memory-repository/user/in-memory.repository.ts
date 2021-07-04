import { Injectable, NotFoundException } from '@nestjs/common';
import { ADMIN, USER } from 'src/entity/constans';
import { User } from 'src/entity/user';
import { IKeyPair } from 'src/users/users.service';

@Injectable()
export class InMemoryUserRepository {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: '$2b$10$NVZuUn6qxpPtmHkLDHxQzetkKgT4Oopi87KOQJcZFFrOm0LdYtWae', //encrypted and salted password 1234
      role: 'ADMIN',
      token: '',
      keyPair: { privateKey: '', publicKey: '' },
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: '$2b$10$bZojqhcDXWZIcfmRD6d9S.mG3hr5oxpM25BTXg35fXJX422NBhnn.', //encrypted and salted password 4321
      role: 'USER',
      token: '',
      keyPair: { privateKey: '', publicKey: '' },
    },
  ];

  async findOneByEmail(
    email: string,
  ): Promise<{ index: number; user: User } | undefined> {
    const predicate = (user: User) => user.email === email;
    const user = this.users.find(predicate);
    const index = this.users.findIndex(predicate);
    return {
      index,
      user,
    };
  }

  async findOneById(
    id: number,
  ): Promise<{ index: number; user: User } | undefined> {
    const predicate = (user: User) => user.id === id;
    const user = this.users.find(predicate);
    const index = this.users.findIndex(predicate);
    return {
      index,
      user,
    };
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async setTokenForUser(email: string, token: string) {
    const { index, user } = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(email);
    }
    this.users[index] = { ...this.users[index], token };
  }

  async setKeyPairForUser(id: number, keyPair: IKeyPair) {
    const { index, user } = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    this.users[index] = { ...this.users[index], keyPair };
  }
}
