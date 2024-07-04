import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { FullLayoutComponent } from './shared/layouts/full-layout/full-layout.component';
import { CustomRouteReuseStrategy } from './shared/custom-route-reuse-strategy';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';


const routes: Routes = [
  // { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Add more child routes here as needed
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[
     { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
   ]
})
export class AppRoutingModule {}
