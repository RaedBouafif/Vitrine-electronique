import { AuthorizationEntity } from './credentials.service';

export class MockCredentialsService {
  credentials: AuthorizationEntity | null = {
    authorized: true,
    email: 'test@user.com',
    fullName: 'Test User',
    expiresIn: 3600,
    accessToken: 'token-123',
    admin: true,
    newUser: false
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  setCredentials(credentials?: AuthorizationEntity, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
