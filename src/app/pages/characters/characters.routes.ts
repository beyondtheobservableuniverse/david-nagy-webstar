import {Route} from '@angular/router';

import {CharactersComponent} from './characters.component';

export default <Route[]>[
  {
    path: '',
    component: CharactersComponent,
    title: 'Karakter választó',
  },
];
