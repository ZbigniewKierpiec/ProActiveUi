import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DashboardLayoutService } from '../../service/dashboard-layout-service/dashboard-layout.service';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  isActive: boolean = false;
  receivedUrl: any | null;
  private fullLayoutSubscription?: Subscription;
  constructor(
    private eventService: EventService,
    private router: Router,
    private currentUrlService: DashboardLayoutService
  ) {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.currentUrlService.currentUrl$.subscribe((url) => {
      this.receivedUrl = url;
        console.log(url)
    });
  }

  ngOnInit(): void {
    this.fullLayoutSubscription = this.eventService.clickEvent$.subscribe(() => {
      this.isActive = !this.isActive;
    });
  }

  ngOnDestroy(): void {
    if (this.fullLayoutSubscription) {
      this.fullLayoutSubscription.unsubscribe();
    }
  }
}
