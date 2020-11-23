import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store';
import { fetchAllProducts } from 'src/app/store/product/product.selectors';

import { fetchAllTransactions } from 'src/app/store/transaction/transaction.selectors';
import { Transaction } from 'src/app/models/transaction.model';
import { PdfHelperService } from 'src/app/shared/helper/pdf-helper.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  products: Product[] = [];
  transactions: Transaction[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private pdfHelperService: PdfHelperService
  ) {}

  ngOnInit(): void {
    this.store.pipe(select(fetchAllProducts)).subscribe((products) => {
      this.products = products;
    });

    this.store.pipe(select(fetchAllTransactions)).subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  getTransationByProductId(productId: string): Transaction[] {
    return this.transactions.filter((trans) => trans.productId === productId);
  }

  downloadPDF(): void {
    const header = ['Item Name', 'Available Quantity'];
    const body = this.products.map(trans => {
      return [trans.title, trans.quantity];
    });
    body.unshift(header);

    const docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['auto', 'auto'],
            body
          }
        }
      ]
    };

    this.pdfHelperService.downloadPdf(docDefinition);
  }

}
