export const GUEST = 'GUEST';
export const ADMIN = 'ADMIN';
export const USER = 'USER';

export type UserRole = typeof ADMIN | typeof USER | typeof GUEST;
