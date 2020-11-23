import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolver } from 'src/app/resolvers/product.resolver';
import { TransactionResolver } from 'src/app/resolvers/transaction.resolver';
import { ReportComponent } from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    resolve: {
      products: ProductResolver,
      transactions: TransactionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
