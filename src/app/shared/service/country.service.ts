import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from '../Interface/app.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private selectedCountrySubject = new BehaviorSubject<Country>({
    id: 0,
    name: 'Default Country',
    flag: '🏳️',
    lang: '',
  });

  selectedCountry$ = this.selectedCountrySubject.asObservable();

  constructor() {}

  setSelectedCountry(country: Country) {
    this.selectedCountrySubject.next(country);
  }
}
