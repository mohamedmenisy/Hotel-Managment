import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

transform(value: any[], start: number, end: number): any[]{
    if (Array.isArray(value)) {
      return value.slice(start, end);
    }
    return value;
  }

}
