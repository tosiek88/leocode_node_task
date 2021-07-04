import { IKeyPair } from 'src/users/users.service';
import { GUEST, UserRole } from './constans';

export const NullUser = {
  id: -1,
  email: '',
  password: '',
  role: GUEST as UserRole,
  token: '',
  keyPair: { privateKey: '', publicKey: '' } as IKeyPair,
};

export class User {
  id: number = NullUser.id;
  email: string = NullUser.email;
  password: string = NullUser.password;
  role: UserRole = NullUser.role;
  token: string = NullUser.token;
  keyPair: IKeyPair = NullUser.keyPair;
}
