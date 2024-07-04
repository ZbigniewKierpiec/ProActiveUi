import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeEventService } from './shared/service/Theme Service/theme-event.service';
import { ThemeService } from './shared/service/Theme Service/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'app';
  private appSubscription?: Subscription;
  constructor(private ThemeEventService:ThemeEventService , private themeService:ThemeService){}
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
    this.appSubscription  =    this.ThemeEventService.clickEvent.subscribe((data)=>{
       this.toggleTheme();
       })
}



ngOnDestroy(): void {
  if (this.appSubscription) {
    this.appSubscription.unsubscribe();
  }
}



}
