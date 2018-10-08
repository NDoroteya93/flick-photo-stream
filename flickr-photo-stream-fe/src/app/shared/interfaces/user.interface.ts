export interface User {
  email: string;
  givenName: string;
  familyName: string;
  created?: Date;
  role?: 'admin' | 'user';
}