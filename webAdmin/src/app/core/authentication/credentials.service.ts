import { Injectable } from '@angular/core';
import { AuthorizationEntity } from './authentication.models';
import * as CryptoJS from 'crypto-js';
const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: AuthorizationEntity | null = null;
  private key = 'Five12345';
  constructor() {
    const savedCredentials =
      sessionStorage.getItem(credentialsKey) ||
      localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(
        CryptoJS.AES.decrypt(savedCredentials, this.key).toString(
          CryptoJS.enc.Utf8
        ) as any
      );
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): AuthorizationEntity | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(
    authorizationEntity?: AuthorizationEntity,
    remember?: boolean
  ) {
    this._credentials = authorizationEntity || null;

    if (authorizationEntity && authorizationEntity.authorized) {
      const credentials = this.createCredentialsFromAuthEntity(
        authorizationEntity
      );
      const storage = remember ? localStorage : sessionStorage;
      let crypto = CryptoJS.AES.encrypt(JSON.stringify(credentials), this.key);
      storage.setItem(credentialsKey, crypto.toString());
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  private createCredentialsFromAuthEntity(
    authorizationEntity: AuthorizationEntity
  ) {
    const username = authorizationEntity.fullName;
    const expiresAt = JSON.stringify(
      authorizationEntity.expiresIn + new Date().getTime()
    );

    return {
      accessToken: authorizationEntity.accessToken,
      fullName: username,
      expires_at: expiresAt,
      admin: JSON.stringify(authorizationEntity.admin),
      email: authorizationEntity.email
    };
  }
}
