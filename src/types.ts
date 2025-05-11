import {FormArray, FormControl, FormGroup} from '@angular/forms';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends FormGroup | FormArray ? T[K] : FormControl<T[K]>;
};

export interface LoginRequestDTO {
  email: string | null;
  password: string | null;
}

export interface LoginResponseDTO {
  refreshToken: string;
  token: string;
  user: WebstarUser;
}

export interface CharactersResponseDTO {
  characters: CharactersDTO[];
}

export type Side = 'DARK' | 'LIGHT';

export interface CharactersDTO {
  ability: {
    midichlorian: number;
    power: string;
  };
  description: string;
  id: string;
  name: string;
  side: Side;
}

export interface WebstarUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface MessageBarData {
  message: string;
  title: string;
}
