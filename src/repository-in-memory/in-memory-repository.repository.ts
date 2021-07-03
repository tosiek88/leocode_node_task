import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/entity/constans';
import { User } from 'src/entity/user';

@Injectable()
export class InMemoryRepository {
  private readonly users = [
    {
      id: 1,
      email: 'admin@mail.com',
      password: '1234',
      role: UserRole.ADMIN,
    },
    {
      id: 2,
      email: 'user@mail.com',
      password: '1234',
      role: UserRole.USER,
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
