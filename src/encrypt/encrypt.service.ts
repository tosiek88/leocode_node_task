import { Injectable } from '@nestjs/common';
import {
  constants,
  generateKeyPairSync,
  privateDecrypt,
  publicEncrypt,
} from 'crypto';
import { IKeyPair } from '../users/users.service';
import { chunkArray } from '../utils/array.helper';

@Injectable()
export class EncryptService {
  async generateKeyPair(): Promise<IKeyPair> {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: process.env.PASSPHRASE,
      },
    });
    return { privateKey, publicKey };
  }

  async encrypt({ publicKey }: IKeyPair, data: string) {
    const encryptedDataBuff = data.match(/.{1,200}/g).map((segment) => {
      const result = publicEncrypt(
        {
          key: publicKey,
          padding: constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(segment),
      );
      return result;
    });

    const totalSize = encryptedDataBuff.reduce((prev, curr) => {
      return prev + curr.length;
    }, 0);

    const encrypted = Buffer.concat([...encryptedDataBuff], totalSize).toString(
      'base64',
    );

    return encrypted;
  }

  async decrypt({ privateKey }: IKeyPair, encrypted: string) {
    return chunkArray(Buffer.from(encrypted, 'base64'), 256)
      .map((chunk) => {
        const result = privateDecrypt(
          {
            key: privateKey,
            passphrase: process.env.PASSPHRASE,
            padding: constants.RSA_PKCS1_PADDING,
          },
          chunk,
        );
        return result.toString('utf-8').concat('\n');
      })
      .join('');
  }
}
