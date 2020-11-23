import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitializeRoutingModule } from './initialize-routing.module';
import { InitializeComponent } from './initialize.component';

@NgModule({
  declarations: [
    InitializeComponent
  ],
  imports: [
    CommonModule,
    InitializeRoutingModule
  ]
})
export class InitializeModule { }
