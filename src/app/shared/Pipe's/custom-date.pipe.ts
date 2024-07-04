import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else {
      // Format date as 'MMM dd hh:mm a'
      const datePipe = new DatePipe('en-US');
      return datePipe.transform(date, 'MMM dd hh:mm a') ?? '';
    }
  }
}
