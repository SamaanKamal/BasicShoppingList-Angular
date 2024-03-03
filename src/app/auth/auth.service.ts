import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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
  apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) {}

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
        catchError((errorRes) => {
          let errorMessage = 'an Unkown Error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            throwError(() => {
              const newError = new Error(errorMessage);
              return newError;
            });
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
          }
          return throwError(() => {
            const newError = new Error(errorMessage);
            return newError;
          });
        })
      );
  }
  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        this.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
