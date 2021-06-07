import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minToH'
})
export class MinToHPipe implements PipeTransform {
  transform(totalMinutes: number) {
    if ( totalMinutes ) {

      const hours: number = totalMinutes / 60;
      const roundHours: number = Math.floor(hours);

      const minutes: number = (hours - roundHours) * 60;
      const roundMinutes: number = Math.round(minutes);

      return `${ roundHours }h ${ roundMinutes }min`;
    }

    return;
  }
}
