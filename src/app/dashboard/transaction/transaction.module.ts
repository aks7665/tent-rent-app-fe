import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionsCreateComponent } from './transactions-create/transactions-create.component';
import { TransactionResolver } from '../../resolvers/transaction.resolver';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerResolver } from 'src/app/resolvers/customer.resolver';
import { ProductResolver } from 'src/app/resolvers/product.resolver';

@NgModule({
  declarations: [TransactionComponent, TransactionsListComponent, TransactionsCreateComponent],
  imports: [
    CommonModule,
    SharedModule,
    TransactionRoutingModule
  ],
  providers: [
    TransactionResolver,
    CustomerResolver,
    ProductResolver
  ]
})
export class TransactionModule { }
