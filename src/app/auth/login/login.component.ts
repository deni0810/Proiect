import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { IProfile } from 'src/app/shared/interfaces/profile.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.buildAuthForm();
  }

  onLogin() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.login(email, password).subscribe((response) => {
      this.authService.handleAuthentification(response);
      this.userService.getProfile(response.localId).subscribe((userArr) => {
        const doc = userArr[0];
        const userData = JSON.parse(localStorage.getItem('userData')!)
        const user = {
          ...userData,
          ...doc
        }
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['profile']);
      });
    },(error: any) => {
      alert('Something went wrong!')
    });
  }

  private buildAuthForm() {
    this.authForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
