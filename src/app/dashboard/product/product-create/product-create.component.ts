import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store';
import { addProduct } from 'src/app/store/product/product.actions';
import { isProductsLoading } from 'src/app/store/product/product.selectors';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(isProductsLoading).subscribe((status) => {
      this.loading = status;
    });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const product: Partial<Product> = form.value;
    this.store.dispatch(addProduct({ product }));
  }

}
