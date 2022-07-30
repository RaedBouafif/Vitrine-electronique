import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CredentialsService } from './credentials.service';
import {
  LoginContext,
  RegisterContext,
  AuthorizationEntity
} from './authentication.models';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn: boolean;

  get isAuthenticated() {
    return this.loggedIn;
  }

  constructor(private credentialsService: CredentialsService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<AuthorizationEntity> {
    this.loggedIn = true;

    // Replace by proper authentication call
    const data: AuthorizationEntity = {
      username: context.username,
      accessToken: context.object._id,
      fullName: context.object.firstname + ' ' + context.object.lastname,
      admin: context.object.role === 1,
      authorized: context.object.deleted === false,
      email: context.object.mail,
      expiresIn: 1
    };

    this.credentialsService.setCredentials(data, context.remember);
    return of(data);
  }

  /**
   * Registers the user.
   * @param context The register parameters.
   * @return The user credentials.
   */
  register(context: RegisterContext): Observable<AuthorizationEntity> {
    // Replace by proper registration call
    const data: AuthorizationEntity = {
      username: context.username,
      accessToken: '654321',
      fullName: '',
      admin: true,
      authorized: true,
      email: '',
      expiresIn: 1
    };

    return of(data);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
