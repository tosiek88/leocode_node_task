import { GUEST, UserRole } from './constans';

export const NullUser = {
  id: -1,
  email: '',
  password: '',
  role: GUEST as UserRole,
  token: '',
};

export class User {
  id: number = NullUser.id;
  email: string = NullUser.email;
  password: string = NullUser.password;
  role: UserRole = NullUser.role;
  token: string = NullUser.token;
}
