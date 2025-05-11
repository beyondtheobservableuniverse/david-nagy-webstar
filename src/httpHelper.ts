import {HttpHeaders} from '@angular/common/http';
import {API_KEY} from '@webstar/config';

export function headers(): HttpHeaders {
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Applicant-Id': API_KEY,
  });
}
