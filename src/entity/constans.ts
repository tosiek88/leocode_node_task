export enum UserRole {
  GUEST = -1,
  ADMIN,
  USER,
}

export const NullUser = {
  id: -1,
  email: '',
  password: '',
  role: UserRole.GUEST,
};
