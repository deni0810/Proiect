import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.buildAuthForm();
  }

  onSignup() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.signup(email, password).subscribe();
  }

  private buildAuthForm() {
    this.authForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
