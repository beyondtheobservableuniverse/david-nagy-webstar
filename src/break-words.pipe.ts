import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'breakWords',
})
export class BreakWordsPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/ /g, '\n');
  }

}
