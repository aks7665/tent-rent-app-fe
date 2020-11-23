export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin';
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
