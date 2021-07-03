import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/entity/constans';
import { User } from 'src/entity/user';

@Injectable()
export class InMemoryUserRepository {
  private readonly users = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: '$2b$10$NVZuUn6qxpPtmHkLDHxQzetkKgT4Oopi87KOQJcZFFrOm0LdYtWae', //encrypted and salted password 1234
      role: UserRole.ADMIN,
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: '$2b$10$bZojqhcDXWZIcfmRD6d9S.mG3hr5oxpM25BTXg35fXJX422NBhnn.', //encrypted and salted password 4321
      role: UserRole.USER,
    },
  ];

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
