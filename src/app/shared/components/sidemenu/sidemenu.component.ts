import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { EventService } from '../../service/event.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardLayoutService } from '../../service/dashboard-layout-service/dashboard-layout.service';
import { ThemeService } from '../../service/Theme Service/theme.service';
import {
 Link
} from 'src/app/shared/Interface/app.interface';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
  currentUrl: any;
  currentTheme: string = '';
  // Reference to slider element
  @ViewChild('slider', { static: true }) slider?: ElementRef;
  private sideMenuSubscription?: Subscription;
  private themeSubscription!: Subscription;
  constructor(
    private eventService: EventService,
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private currentUrlService: DashboardLayoutService,
    private themeServices: ThemeService
  ) {}
  // Array of menu items
  links: Link[] = [
    { id: 1, icon: 'fa solid fa-house', name: 'dashboard' },
    { id: 2, icon: 'fa solid fa-chart-line', name: 'test' },
    { id: 3, icon: 'fa solid fa-table-columns', name: 'test' },
  ];
  // Track the active item
  activeItem: string | null = null;

  // Track whether the side menu is active
  isActive = false;
  // Track whether the same item is clicked again
  isSame?: number;
  // Handle item click event
  handleItemClick(event: MouseEvent, item: Link, index: number) {
    // Get the offset top position of the clicked item
    const offsetTop = (event.currentTarget as HTMLElement).offsetTop;
    console.log(item);
    // console.log(item.name);
    this.currentUrlService.setCurrentUrl(item.name);

    // Set the active item
    this.activeItem = item.name;

    this.isSame = item.id;

    // Set the slider position
    if (this.slider && this.slider.nativeElement) {
      this.renderer.setStyle(
        this.slider.nativeElement,
        'top',
        offsetTop + 'px'
      );
    } else {
      console.error('Slider element is not available');
    }

    if (item.name === 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['']);
    }
  }
  // Handle burger menu click event to toggle side menu visibility
  handleActiveBurger() {
    this.isActive = !this.isActive;
  }
  // Handle click event to toggle side menu visibility
  handleClick() {
    console.log('Click event received in Component 2');
    this.isActive = !this.isActive;
    console.log(this.isActive);
  }

  // Subscribe to click events from EventService
  ngOnInit(): void {
    this.sideMenuSubscription = this.eventService.clickEvent$.subscribe(() => {
      this.handleClick();
    });

    this.themeSubscription = this.themeServices
      .getCurrentTheme()
      .subscribe((data: any) => {
        this.currentTheme = data;

        console.log(this.currentTheme);
      });
  }

  ngOnDestroy(): void {
    if (this.sideMenuSubscription) {
      this.sideMenuSubscription.unsubscribe();
    }

    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
