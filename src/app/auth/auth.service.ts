import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post(
      `${environment.firebaseConfig.authAPI}/signupNewUser?key=${environment.firebaseConfig.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http.post(
      `${environment.firebaseConfig.authAPI}/verifyPassword?key=${environment.firebaseConfig.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  handleAuthentification(data: any) {
    localStorage.setItem('userData', JSON.stringify(data));
  }
}
