import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerResolver } from 'src/app/resolvers/customer.resolver';

@NgModule({
  declarations: [CustomerCreateComponent, CustomerListComponent, CustomerComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  providers: [
    CustomerResolver
  ]
})
export class CustomerModule { }
