import { Injectable } from '@nestjs/common';
import { generateKeyPairSync } from 'crypto';
import { IKeyPair } from 'src/users/users.service';

@Injectable()
export class EncryptService {
  async generateKeyPair(): Promise<IKeyPair> {
    return generateKeyPairSync('rsa', {
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
    });
  }
}
