import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { generateKeyPair } from 'crypto';

@Injectable()
export class EncryptService {
  constructor(private readonly userService: UsersService) {}

  async generateKeyPairForUser(user: UserDto) {
    generateKeyPair(
      'rsa',
      {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: 'top secret',
        },
      },
      (err, publicKey, privateKey) => {},
    );
  }
}
