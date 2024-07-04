import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  private clickEventSubject = new Subject<void>();
  clickEvent$ = this.clickEventSubject.asObservable();

  emitClickEvent() {
    this.clickEventSubject.next();
  }

  constructor() { }
}
