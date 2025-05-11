import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig, inject, Injectable, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material/form-field';
import {Title} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter, RouterStateSnapshot, TitleStrategy, withViewTransitions} from '@angular/router';

import {ROUTES} from './app.routes';

@Injectable()
class TemplatePageTitleStrategy extends TitleStrategy {

  private readonly title = inject(Title);

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - Webstar Frontend`);
    }
  }

}

const MAT_RIPPLE_CONFIG: RippleGlobalOptions = {
    disabled: true,
  },

  MAT_FORM_FIELD_CONFIG: MatFormFieldDefaultOptions = {
    floatLabel: 'always',
    appearance: 'fill',
  };

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: MAT_RIPPLE_CONFIG},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MAT_FORM_FIELD_CONFIG},
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideRouter(ROUTES, withViewTransitions()),
    provideExperimentalZonelessChangeDetection(),
  ],
};
