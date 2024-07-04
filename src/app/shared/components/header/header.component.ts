import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../service/event.service';
import { ThemeEventService } from '../../service/Theme Service/theme-event.service';

import { FullScreenService } from '../../service/full-screen/full-screen.service';
import { SwitcherService } from '../../service/Switcher Service/switcher.service';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../service/Theme Service/theme.service';
import {
  Country,
  Profile,
  Notification,
} from 'src/app/shared/Interface/app.interface';

import { TranslationService } from '../../service/Translations Service/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isActiveHeader: boolean = false;
  isSame?: number;

  isActiveList: boolean = false;
  isActiveNotifi: boolean = false;
  languages: string = 'https://flagpedia.net/data/flags/w580/gb.webp';

  // Profile array for user menu items
  profile: Profile[] = [
    {
      icon: 'fa-regular fa-user',
      name: 'profile',
      inbox: false,
    },
    {
      icon: 'fa-solid fa-inbox',
      name: 'inbox',
      inbox: true,
    },
    {
      icon: 'fa-regular fa-compass',
      name: 'activity',
      inbox: false,
    },
    {
      icon: 'fa-solid fa-gear',
      name: 'settings',
      inbox: false,
    },
    {
      icon: 'fa-solid fa-headphones-simple',
      name: 'support',
      inbox: false,
    },
    {
      icon: 'fa-solid fa-power-off',
      name: 'log out',
      inbox: false,
    },
  ];

  // Notifications array for displaying notifications

  notifications: Notification[] = [
    {
      id: 1,
      name: 'John Doe',
      message: 'You have a new message!',
      date: new Date('2024-06-26'),
    },
    {
      id: 2,
      name: 'Jane Smith',
      message: 'Your order has been shipped.',
      date: new Date('2024-06-23'),
    },
    {
      name: 'Alice Johnson',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-23'),
      id: 3,
    },

    {
      id: 4,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-26'),
    },

    {
      id: 5,
      name: 'Parces sended',
      message: 'Reminder: Meeting at 3 PM.',
      date: new Date('2024-06-26'),
    },
  ];
  notificationLength = 0;
  fullScreenMode: boolean = false;
  currentTheme: string = '';
  profileActive: boolean = false;
  private headerSubscription?: Subscription;
  private themeSubscription!: Subscription;

  constructor(
    private eventService: EventService,
    private ThemeEventService: ThemeEventService,
    private themeServices: ThemeService,
    private cdr: ChangeDetectorRef,
    private FullScreenService: FullScreenService,
    private SwitcherService: SwitcherService,

    private trans: TranslationService
  ) {}

  // Array of available languages

  country: Country[] = [
    {
      id: 1,
      flag: 'https://flagpedia.net/data/flags/w580/gb.webp',
      name: 'english',
      lang: 'eng',
    },
    {
      id: 2,
      flag: 'https://flagpedia.net/data/flags/w580/es.webp',
      name: 'spanish',
      lang: 'esp',
    },
    {
      id: 3,
      flag: 'https://flagpedia.net/data/flags/w580/fr.webp ',
      name: 'french',
      lang: 'fr',
    },
    {
      id: 4,
      flag: 'https://flagpedia.net/data/flags/w580/de.webp',
      name: 'german',
      lang: 'de',
    },
    {
      id: 5,
      flag: 'https://flagpedia.net/data/flags/w580/it.webp',
      name: 'italian',
      lang: 'ita',
    },
    {
      id: 6,
      flag: 'https://flagpedia.net/data/flags/w580/pl.webp',
      name: 'polish',
      lang: 'pl',
    },
  ];
  // Method to handle header click events
  handleClick() {
    console.log('Click event received in Component 2');
    this.isActiveHeader = !this.isActiveHeader;
    console.log('header works' + this.isActiveHeader);
  }

  themeActive: boolean = false;

  // Method to handle theme change events
  onThemeChange() {
    this.themeActive = !this.themeActive;
    console.log('change theme');
    this.ThemeEventService.clickEvent.emit();
  }
  // Method to handle country selection dropdown
  onCountrySelection() {
    this.isActiveList = !this.isActiveList;
  }
  // Method to choose a country and update the flag
  choseCountry(item: Country) {
    console.log(item.lang);
    this.isSame = item.id;
    this.languages = item.flag;
    this.trans.switchLanguage(item.lang);

    // Store the flag URL in local storage
    localStorage.setItem('selectedCountryFlag', item.flag);
    // window.location.reload();
  }
  // Method to toggle full screen mode
  toggleFullScreen() {
    this.FullScreenService.toggleFullScreen();
    this.fullScreenMode = !this.fullScreenMode;
  }
  // Method to handle switcher change events
  onSwitcherChange() {
    this.SwitcherService.clickEvent.emit();
  }

  // Method to show or hide the profile menu

  onProfileShow() {
    this.profileActive = !this.profileActive;
    console.log(this.profileActive);
  }

  // Method to handle profile selection

  onProfileSelect(item: Profile) {
    console.log(item.name);
    this.profileActive = !this.profileActive;
  }
  // Method to show or hide notifications
  onShowNotifi() {
    this.isActiveNotifi = !this.isActiveNotifi;
  }
  // Method to delete a notification
  onMessageDetete(item: Notification) {
    const index = this.notifications.findIndex(
      (notification) => notification.id === item.id
    );
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  }

  // Lifecycle hook to initialize subscriptions
  ngOnInit(): void {
    this.headerSubscription = this.eventService.clickEvent$.subscribe(() => {
      this.handleClick();
    });

    this.themeSubscription = this.themeServices
      .getCurrentTheme()
      .subscribe((data: any) => {
        this.currentTheme = data;

        console.log(this.currentTheme);
      });
    const storedFlag = localStorage.getItem('selectedCountryFlag');
    if (storedFlag) {
      this.languages = storedFlag;
    }
  }
  // Lifecycle hook to clean up subscriptions
  ngOnDestroy(): void {
    if (this.headerSubscription) {
      this.headerSubscription.unsubscribe();
    }

    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
