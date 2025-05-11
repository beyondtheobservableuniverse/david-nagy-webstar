import {AutofillMonitor} from '@angular/cdk/text-field';
import {HttpErrorResponse} from '@angular/common/module.d-CnjH8Dlt';
import {ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {FooterComponent} from '@webstar/app/plugins/footer/footer.component';
import {EMAIL_REGEX, PASSWORD_MIN_LENGTH} from '@webstar/config';
import {FormEvent} from '@webstar/formEvent';
import {AuthService} from '@webstar/services/auth.service';
import {MessageService} from '@webstar/services/message.service';
import {ControlsOf, LoginRequestDTO} from '@webstar/types';
import {filter, Observable} from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-login',
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    MessageService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends FormEvent implements OnInit {

  public saveInProgress = signal(false);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private autofill = inject(AutofillMonitor);
  private router = inject(Router);
  public email = viewChild<HTMLInputElement, ElementRef<HTMLInputElement>>('email', {read: ElementRef});
  public loginForm = new FormGroup<ControlsOf<LoginRequestDTO>>({
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
    password: new FormControl('', [Validators.minLength(PASSWORD_MIN_LENGTH), Validators.required]),
  });

  constructor() {
    super();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.saveInProgress.set(true);
      this.authService.login(this.loginForm.getRawValue()).pipe(untilDestroyed(this)).subscribe({
        next: (loginResponse) => {
          if (loginResponse?.token) {
            localStorage.setItem('authData', JSON.stringify(loginResponse));
            this.router.navigateByUrl('karaktervalaszto');
          } else {
            this.loginFailed();
          }
        },
        error: (err: HttpErrorResponse) => {
          this.loginFailed(err.status === 500 ? err.error : '');
        },
      });
    }
  }

  private loginFailed(message = ''): void {
    this.messageService.errorBar(message || 'Belső szerver hiba', 'Sikertelen bejelentkezés!');
    this.saveInProgress.set(false);
  }

  override handleEnterKeydown(event: Observable<KeyboardEvent>): void {
    event.pipe(filter(() => this.loginForm.dirty && !this.saveInProgress()),
      untilDestroyed(this)).subscribe(() => this.login());
  }

  ngOnInit(): void {
    const emailRef = this.email();
    if (emailRef?.nativeElement) {
      this.autofill.monitor(emailRef).pipe(untilDestroyed(this)).subscribe({
        next: () => {
          this.loginForm.markAsDirty();
        },
      });
    }
  }

}
