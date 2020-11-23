import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { CustomerResolver } from '../../resolvers/customer.resolver';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: '',
        component: CustomerListComponent,
        resolve: {
          customers: CustomerResolver
        }
      },
      {
        path: 'create',
        component: CustomerCreateComponent
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
export class CustomerRoutingModule { }
