import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {API_URL} from '@webstar/config';
import {headers} from '@webstar/httpHelper';
import {CharactersResponseDTO} from '@webstar/types';
import {Observable} from 'rxjs';

@Injectable()
export class CharacterService {

  private http = inject(HttpClient);

  getCharacters(): Observable<CharactersResponseDTO> {
    return this.http.get<CharactersResponseDTO>(`${API_URL}/characters/`, {headers: headers()});
  }

}
