import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'personList'
})
export class PersonListPipe implements PipeTransform {

  transform(value: Array<string>, args?: any): string {
    return value.sort().join('<br/>');
  }

}
