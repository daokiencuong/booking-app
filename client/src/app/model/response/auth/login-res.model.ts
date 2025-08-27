export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginRes {
  user: User;
  access_token: string;
}
