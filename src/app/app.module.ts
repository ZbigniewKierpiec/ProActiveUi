import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Import NgxChartsModule
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { TestComponent } from './shared/components/test/test.component';
import { HamburgerMenuComponent } from './shared/components/header/hamburger-menu/hamburger-menu.component';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';
import { ResizableDraggableComponent } from './components/resizable-draggable/resizable-draggable.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,

} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { GridsterModule } from 'angular-gridster2';
import { TestDirective } from './shared/directives/test.directive';
import { BackToTopBtnComponent } from './shared/components/back-to-top-btn/back-to-top-btn.component';

import { CustomDatePipe } from "./shared/Pipe's/custom-date.pipe";
import { NotificationMenuComponent } from './shared/components/header/notificationMenu/notification-menu/notification-menu.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FullLayoutComponent,
    HeaderComponent,
    SidemenuComponent,
    TestComponent,
    HamburgerMenuComponent,
    ThemeSwitcherComponent,
    ResizableDraggableComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    DragDropModule,
    AppRoutingModule,
    GridsterModule,
    NgxChartsModule,
    TestDirective,
    BackToTopBtnComponent,
    CustomDatePipe,
    NotificationMenuComponent,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AppModule {}
