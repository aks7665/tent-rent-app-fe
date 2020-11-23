import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolver } from '../../resolvers/product.resolver';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductCreateComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ],
  providers: [
    ProductResolver
  ]
})
export class ProductModule { }
