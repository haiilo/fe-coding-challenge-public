import { Pipe, PipeTransform } from '@angular/core';

// It is just an example of Pipe, it is not used in application
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }
    return value;
  }
}
