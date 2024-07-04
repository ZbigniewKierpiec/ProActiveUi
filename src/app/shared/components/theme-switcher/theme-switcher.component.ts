import { Component,  OnDestroy, OnInit} from '@angular/core';
import { SwitcherService } from '../../service/Switcher Service/switcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
})
export class ThemeSwitcherComponent implements OnInit, OnDestroy {
  private themeSwitcherSubscription?: Subscription;
  isActive:boolean=false;
  constructor(private themeSwitcher: SwitcherService) {}



close(){
  this.isActive = false;
}



  ngOnInit(): void {
    this.themeSwitcherSubscription = this.themeSwitcher.clickEvent.subscribe(
      () => {
        console.log('dziala w switcher ');
        this.isActive =!this.isActive;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.themeSwitcherSubscription) {
      this.themeSwitcherSubscription.unsubscribe();
    }
  }
}
