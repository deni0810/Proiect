import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.buildAuthForm();
  }

  onSignup() {
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.authService.signup(email, password).subscribe((response)=>{
      this.authService.handleAuthentification(response);
      this.router.navigate(['home']);
      console.log(response);
      const user = {

        rol: this.buildAuthForm.value.rol,
        id: response.localId


      }
      this.userService.saveAccount(user);
      console.log(this.authForm.value);
    });
  }

  private buildAuthForm() {
    this.authForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rol: [null, Validators.required]
    });
  }



}

