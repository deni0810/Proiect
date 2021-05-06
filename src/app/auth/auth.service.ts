import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { IAuthResponse } from '../shared/interfaces/auth-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject$ = new BehaviorSubject<IUser>(null!);
  public user$: Observable<IUser> = this.userSubject$.asObservable();
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<IAuthResponse>(
      `${environment.firebaseConfig.authAPI}/signupNewUser?key=${environment.firebaseConfig.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string) {
    return this.http.post<IAuthResponse>(
      `${environment.firebaseConfig.authAPI}/verifyPassword?key=${environment.firebaseConfig.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  handleAuthentification(data: any) {
    const {
      email,
      password,
      id,
      token,
      expiresIn,
    } = data;
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = {
      email,
      password,
      id,
      token,
      expirationDate,
    };
    localStorage.setItem('userData', JSON.stringify(user));
    this.userSubject$.next(user);
    this.autologout(+expiresIn * 1000);
  }

  autologin() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    if (user === null) {
      this.router.navigate(['login']);
    } else {
      const expirationDuration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      if (expirationDuration < 0) {
        this.logout();
      }
      if (user.token) {
        this.userSubject$.next(user);
        this.autologout(expirationDuration);
      }
    }
  }

  logout() {
    this.userSubject$.next(null!);
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  autologout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
