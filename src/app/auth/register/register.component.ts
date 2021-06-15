import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user.service';
import { IProfile } from 'src/app/shared/interfaces/profile.interface';




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
      const user: IProfile = {
        rol: this.authForm.value.rol,
        id: response.localId
      }
      this.userService.saveAccount(user);
    },(error: any) => {
      alert('Something went wrong!')
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

