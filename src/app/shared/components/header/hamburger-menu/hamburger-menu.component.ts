import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ThemeService } from 'src/app/shared/service/Theme Service/theme.service';
import { EventService } from 'src/app/shared/service/event.service';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss'],
})
export class HamburgerMenuComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private ThemeService: ThemeService,
    private renderer: Renderer2,
    private el: ElementRef,

  ) {}
  themeService: any;

  click() {
    this.eventService.emitClickEvent();

  }

  ngOnInit(): void {
    this.themeService = this.ThemeService;
  }
}
