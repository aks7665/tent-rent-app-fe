import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerResolver } from 'src/app/resolvers/customer.resolver';
import { ProductResolver } from 'src/app/resolvers/product.resolver';
import { TransactionResolver } from '../../resolvers/transaction.resolver';
import { TransactionComponent } from './transaction.component';
import { TransactionsCreateComponent } from './transactions-create/transactions-create.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    resolve: {
      transactions: TransactionResolver
    },
    children: [
      {
        path: '',
        component: TransactionsListComponent,
      },
      {
        path: 'create',
        component: TransactionsCreateComponent,
        resolve: {
          customers: CustomerResolver,
          products: ProductResolver
        }
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
