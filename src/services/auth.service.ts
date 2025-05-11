import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {API_URL} from '@webstar/config';
import {headers} from '@webstar/httpHelper';
import {LoginRequestDTO, LoginResponseDTO} from '@webstar/types';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {

  private http = inject(HttpClient);

  login(request: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${API_URL}/authentication/`, request, {headers: headers()});
  }

}
