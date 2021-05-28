import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  rol = '';

  constructor() {
    const user = JSON.parse(localStorage.getItem('userData')!);

    this.rol = user.rol;
  }
}
