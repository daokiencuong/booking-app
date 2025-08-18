import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: string | number, type: 'string' | 'number' = 'string'): string {
    if (value == null || value === '') return '';

    if (type === 'string' && typeof value === 'string') {
      // parse ISO duration string, ví dụ: "PT1H30M"
      const hoursMatch = value.match(/(\d+)H/);
      const minutesMatch = value.match(/(\d+)M/);

      const hours = hoursMatch ? `${hoursMatch[1]}h` : '';
      const minutes = minutesMatch ? `${minutesMatch[1]}m` : '';

      return `${hours} ${minutes}`.trim();
    }

    if (type === 'number' && typeof value === 'number') {
      // parse số phút
      const hours = Math.floor(value / 60);
      const minutes = value % 60;

      if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${minutes}m`;
      }
    }

    return '';
  }
}
