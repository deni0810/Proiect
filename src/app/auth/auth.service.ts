import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../shared/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject$ = new BehaviorSubject<IUser>(null!);
  public user$: Observable<IUser> = this.userSubject$.asObservable();

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

  autologin() {
    const user = JSON.parse(localStorage.getItem('userData')!);
    this.userSubject$.next(user);
    //! Sterge asta
    // Asa o sa folosesti acel user. Mai sus ii atribui o valoare, iar mai jos, o citesti
    this.user$.subscribe((user) => {
      console.log(user);
    });
    //!
  }
}
