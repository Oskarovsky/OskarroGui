import { Injectable } from '@angular/core';

/**
 * Class is responsible for storing and retrieving the token and user information from Browser’s Session Storage.
 * For Logout, we only need to clear this Session Storage.
 * */

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    if (sessionStorage.getItem(USER_KEY) !== null && sessionStorage.getItem(USER_KEY) != undefined) {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
  }
}
