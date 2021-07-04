import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { EncryptService } from '../encrypt/encrypt.service';
import { User } from '../entity/user';
import { InMemoryUserRepository } from '../in-memory-repository/user/in-memory.repository';
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

  async getAll() {
    const users = await this.userRepository.getAll();
    return users.map((user) => this.mapper.map(user, UserDto, User));
  }

  async findByEmail(email: string): Promise<UserDto> {
    const { user } = await this.userRepository.findOneByEmail(email);
    const mappedUser = this.mapper.map(user, UserDto, User);
    return mappedUser;
  }

  async getKeysForUser(id: number): Promise<IKeyPair> {
    return this.userRepository.getKeysForUser(id);
  }

  async setTokenForUser(email: string, token: string) {
    return await this.userRepository.setTokenForUser(email, token);
  }

  async generateKeyPairForUser(id: number) {
    const keyPair = await this.encryptService.generateKeyPair();
    await this.userRepository.setKeyPairForUser(id, keyPair);
    return keyPair;
  }

  async encrypt(id: number, data: string) {
    const keyPair = await this.getKeysForUser(id);
    const encrypted = await this.encryptService.encrypt(keyPair, data);
    return encrypted;
  }

  async decrypt(id: number, data: string) {
    const keyPair = await this.getKeysForUser(id);
    const decrypted = await this.encryptService.decrypt(keyPair, data);
    return decrypted;
  }
}
