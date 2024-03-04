import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registerd?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: unknown;
  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.localId,
            responseData.email,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthentication(
            responseData.localId,
            responseData.email,
            responseData.idToken,
            +responseData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  loginStorage() {
    const userStorage: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userStorage) {
      return;
    }

    const loadedUser = new User(
      userStorage.id,
      userStorage.email,
      userStorage._token,
      new Date(userStorage._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userStorage._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.logoutStorage(expirationDuration);
    }
  }

  logoutStorage(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  handleAuthentication(
    userId: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(userId, email, token, expirationDate);
    this.user.next(user);
    this.logoutStorage(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an Unkown Error occurred!';
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => {
        const newError = new Error(errorMessage);
        return newError;
      });
    }
    switch (errorRes.error.error.message) {
      //for the sign up: all below
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'You are not Allowed to access.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'Tried too much, Try again later.';
        break;

      // for the log in: all below
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The email or password you entered is wrong.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        console.log('here');
        errorMessage = 'This password is not correct';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled.';
        break;
    }
    return throwError(() => {
      const newError = new Error(errorMessage);
      return newError;
    });
  }
}
