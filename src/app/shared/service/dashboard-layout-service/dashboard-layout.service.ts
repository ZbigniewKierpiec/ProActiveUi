import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



interface GridsterItem {
  id: number;
  name: string;
  width:number,
  height:number,
  x: number;
  y: number;
  rows: number;
  cols: number;
}
@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {
  private currentUrlSubject = new BehaviorSubject<string | null>(null);
  currentUrl$ = this.currentUrlSubject.asObservable();
  private storageKey = 'gridsterLayout';
  private currentUrl: string | null = null;
  constructor() {}

  // saveLayout(layout: GridsterItem[]) {
  //   localStorage.setItem(this.storageKey, JSON.stringify(layout));
  // }

  // getLayout(): GridsterItem[] {
  //   const layoutString = localStorage.getItem(this.storageKey);
  //   return layoutString ? JSON.parse(layoutString) : [];
  // }




 // Method to save data to localStorage
 save(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

// Method to retrieve data from localStorage
get(key: string): any {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}










  clearLayout() {
    localStorage.removeItem(this.storageKey);
  }




  setCurrentUrl(url: string): void {
    this.currentUrlSubject.next(url);
  }






}
