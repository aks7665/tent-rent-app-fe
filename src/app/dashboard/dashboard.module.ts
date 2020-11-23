import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardLandingComponent } from './dashboard-landing/dashboard-landing.component';

@NgModule({
  declarations: [DashboardComponent, DashboardLandingComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [
  ]
})
export class DashboardModule { }
