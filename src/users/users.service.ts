import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { User } from 'src/entity/user';
import { InMemoryUserRepository } from 'src/in-memory-repository/user/in-memory.repository';
import { UserDto } from './user.dto';

export interface IKeyPair {
  privateKey: string;
  publicKey: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: InMemoryUserRepository,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly encryptService: EncryptService,
  ) {}

  async findByEmail(email: string): Promise<UserDto> {
    const { user } = await this.userRepository.findOneByEmail(email);
    const mappedUser = this.mapper.map(user, UserDto, User);
    return mappedUser;
  }

  async setTokenForUser(email: string, token: string) {
    return await this.userRepository.setTokenForUser(email, token);
  }

  async generateKeyPairForUser(id: number) {
    const keyPair = await this.encryptService.generateKeyPair();
    return await this.userRepository.setKeyPairForUser(id, keyPair);
  }

  async getAll() {
    return await this.userRepository.getAll();
  }
}
