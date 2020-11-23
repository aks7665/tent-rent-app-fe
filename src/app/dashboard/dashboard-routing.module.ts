import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLandingComponent } from './dashboard-landing/dashboard-landing.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardLandingComponent
      },
      {
        path: 'customers',
        loadChildren: () => import('./customer/customer.module').then((m) => m.CustomerModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'initialize',
        loadChildren: () => import('./initialize/initialize.module').then((m) => m.InitializeModule)
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transaction/transaction.module').then((m) => m.TransactionModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./report/report.module').then((m) => m.ReportModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
