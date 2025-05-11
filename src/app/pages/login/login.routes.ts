import {Route} from '@angular/router';

import {LoginComponent} from './login.component';

export default <Route[]>[
  {
    path: '',
    component: LoginComponent,
    title: 'Bejelentkezés',
  },
];
