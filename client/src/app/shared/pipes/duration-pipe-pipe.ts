import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';

    const hoursMatch = value.match(/(\d+)H/);
    const minutesMatch = value.match(/(\d+)M/);

    const hours = hoursMatch ? `${hoursMatch[1]}h` : '';
    const minutes = minutesMatch ? `${minutesMatch[1]}m` : '';

    return `${hours} ${minutes}`.trim();
  }
}
