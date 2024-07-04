import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwitcherService {
  clickEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}
}
