import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.buildAuthForm();
  }

  onLogin() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.login(email, password).subscribe((response)=>{
      this.authService.handleAuthentification(response);
      this.router.navigate(['home']);
    });
  }

  private buildAuthForm() {
    this.authForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

}
