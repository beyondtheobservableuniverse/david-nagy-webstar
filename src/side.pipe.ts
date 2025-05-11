import {Pipe, PipeTransform} from '@angular/core';
import {Side} from '@webstar/types';

@Pipe({
  name: 'side',
})
export class SidePipe implements PipeTransform {

  transform(value: Side | undefined): string {
    return value === 'DARK' ? 'Sötét' : 'Világos';
  }

}
