import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { TransactionResolver } from 'src/app/resolvers/transaction.resolver';
import { ProductResolver } from 'src/app/resolvers/product.resolver';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportRoutingModule
  ],
  providers: [
    TransactionResolver,
    ProductResolver
  ]
})
export class ReportModule { }
