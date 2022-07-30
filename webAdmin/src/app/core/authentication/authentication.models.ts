export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
  object: any;
}

export interface RegisterContext {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthorizationEntity {
  username?: string;
  authorized: boolean;
  email: string;
  fullName: string;
  expiresIn: number;
  accessToken: string;
  admin: boolean;
}
