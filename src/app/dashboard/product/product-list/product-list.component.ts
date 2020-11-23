import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store';
import { fetchAllProducts } from 'src/app/store/product/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products$: Observable<Product[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.store.pipe(select(fetchAllProducts));
  }

  redirectTo(path): void {
    this.router.navigate(path);
  }

}
