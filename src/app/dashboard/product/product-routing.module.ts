import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductResolver } from '../../resolvers/product.resolver';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        resolve: {
          products: ProductResolver
        }
      },
      {
        path: 'create',
        component: ProductCreateComponent
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
export class ProductRoutingModule { }
