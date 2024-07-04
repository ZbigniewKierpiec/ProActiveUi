import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterComponent,
  GridsterConfig,
  GridsterItemComponent,
  GridsterItemComponentInterface,
  GridType,
  PushDirections,
  Resizable,
} from 'angular-gridster2';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DashboardLayoutService } from 'src/app/shared/service/dashboard-layout-service/dashboard-layout.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ThemeEventService } from 'src/app/shared/service/Theme Service/theme-event.service';
import { ThemeService } from 'src/app/shared/service/Theme Service/theme.service';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/shared/service/event.service';
import {
  GridsterItem,
  ChartMenuItems,
} from 'src/app/shared/Interface/app.interface';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gridOptions: GridsterConfig; // Configuration for the gridster grid
  private idCounter = 0;
  private generatedIds: Set<number> = new Set(); // Set to store generated unique IDs
  private countrySubscription: Subscription | undefined;
  items: GridsterItem[]; // Array to hold gridster items
  variableValue: GridsterItem[];
  nameUrl: string = ''; // Placeholder variable for a name URL
  idQ: number = 0;
  isActive: boolean = false; // State to track if is active
  paddingActive: boolean; // State to track if padding is active

  tileMenuActive: boolean = false; // State to track if tile menu is active
  private themeSubscription!: Subscription; // Subscription for theme changes
  currentTheme: string = ''; // Current theme (light/dark mode)
  // Define the chart menu items
  chartMenuItems: ChartMenuItems[] = [
    { name: 'tile' },
    { name: 'bar chart' },
    { name: 'line chart' },
    { name: 'pie chart' },
  ];

  // Constructor to inject services
  constructor(
    private layoutService: DashboardLayoutService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
    private eventService: EventService,

  ) {
    this.paddingActive = false;

    // Initialize gridster configuration

    this.gridOptions = {
      gridType: 'scrollVertical',
      setGridSize: true,
      defaultItemRows: 1,

      margin: 20,

      mobileBreakpoint: 640,

      displayGrid: 'onDrag&Resize',
      minCols: 48,
      maxCols: 48,
      minRows: 48,
      maxRows: 48,

      pushItems: false,

      draggable: {
        enabled: true,
        // start: this.onTileMove.bind(this),
        // stop: this.onTileMove.bind(this),
      },
      resizable: {
        enabled: true,
        // start: this.onTileMove.bind(this),
        // stop: this.onTileMove.bind(this),
      },
    };

    // this.items = [];

    // Initialize the items array with predefined gridster items

    // Define several gridster items with specific properties
    this.items = [
      {
        id: 1,
        name: '1',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        cols: 30,
        rows: 4,
        hasHeader: false,
      },
      {
        id: 2,
        name: '2',
        width: 100,
        height: 100,
        x: 0,
        y: 4,
        cols: 10,
        rows: 5,
        hasHeader: false,
      },
      {
        id: 3,
        name: '3',
        width: 100,
        height: 100,
        x: 10,
        y: 4,
        cols: 10,
        rows: 5,
        hasHeader: false,
      },
      {
        id: 4,
        name: '4',
        width: 100,
        height: 100,
        x: 20,
        y: 4,
        cols: 10,
        rows: 5,
        hasHeader: false,
      },
      {
        id: 5,
        name: '5',
        width: 100,
        height: 100,
        x: 0,
        y: 5,
        cols: 30,
        rows: 14,
        hasHeader: false,
      },
      {
        id: 6,
        name: '6',
        width: 100,
        height: 100,
        x: 0,
        y: 23,
        cols: 15,
        rows: 7,
        hasHeader: false,
      },
      {
        id: 7,
        name: '7',
        width: 100,
        height: 100,
        x: 15,
        y: 23,
        cols: 15,
        rows: 7,
        hasHeader: false,
      },
      {
        id: 8,
        name: '8',
        width: 100,
        height: 100,
        x: 0,
        y: 30,
        cols: 30,
        rows: 12,
        hasHeader: false,
      },
      {
        id: 9,
        name: '9',
        width: 100,
        height: 100,
        x: 20,
        y: 0,
        cols: 18,
        rows: 14,
        hasHeader: false,
      },
      {
        id: 10,
        name: '10',
        width: 100,
        height: 100,
        x: 20,
        y: 0,
        cols: 18,
        rows: 5,
        hasHeader: false,
      },
      {
        id: 11,
        name: '11',
        width: 100,
        height: 100,
        x: 20,
        y: 0,
        cols: 18,
        rows: 13,
        hasHeader: false,
      },
      {
        id: 12,
        name: '12',
        width: 100,
        height: 100,
        x: 20,
        y: 0,
        cols: 18,
        rows: 10,
        hasHeader: false,
      },
    ];

    this.variableValue = [];

    // translate.setDefaultLang('eng'); // Set the default language
    // translate.use('eng'); // Use a specific language
  }
  // Method to add a new tile to the grid
  onAddTile() {
    const newItem: GridsterItem = {
      id: this.generateUniqueId(),
      name: `Item ${this.items.length + 1}`,
      x: 0,
      y: 0,
      rows: 3,
      cols: 3,
      width: 100,
      height: 100,
      hasHeader: false,
    };

    this.items.push(newItem);
  }
  // Method to toggle the tile menu
  chartMenuTaggle() {
    this.tileMenuActive = !this.tileMenuActive;
  }

  // Method to handle selection of chart menu items
  chartMenuItemsSelect(item: ChartMenuItems) {
    if (item.name === 'tile') {
      this.onAddTile();
      this.tileMenuActive = !this.tileMenuActive;
      console.log(item.name);
    }
  }
  // Method to delete a tile from the grid
  deleteTile(item: GridsterItem): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    console.log('delete tile');
  }
  // Method to generate a unique ID
  generateUniqueId(): number {
    let newId: number;
    const timestamp = Date.now();

    do {
      newId = parseInt(`${timestamp}${++this.idCounter}`);
    } while (this.generatedIds.has(newId));

    this.generatedIds.add(newId);
    return newId;
  }
  // Lifecycle hook that is called after data-bound properties are initialized
  ngOnInit(): void {
    this.cdr.detectChanges();
    // Subscribe to theme changes
    this.themeSubscription = this.themeService
      .getCurrentTheme()
      .subscribe((data) => {
        this.currentTheme = data;

        this.cdr.detectChanges();
      });
    // Subscribe to click events
    this.eventService.clickEvent$.subscribe(() => {
      this.paddingActive = !this.paddingActive;
      this.cdr.detectChanges();
      this.isActive = !this.isActive;
    });
  }

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
