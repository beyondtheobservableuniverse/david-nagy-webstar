import {NgOptimizedImage} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {LoginResponseDTO} from '@webstar/types';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  private router = inject(Router);
  public authData: LoginResponseDTO = {
    token: '',
    refreshToken: '',
    user: {
      email: '',
      firstName: '',
      lastName: '',
    },
  };

  constructor() {
    const authData = localStorage.getItem('authData');
    if (authData) {
      this.authData = JSON.parse(authData);
    }
  }

  logout(): void {
    localStorage.removeItem('authData');
    this.router.navigateByUrl('bejelentkezes');
  }

}
