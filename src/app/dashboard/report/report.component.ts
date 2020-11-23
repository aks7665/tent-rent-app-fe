import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store';
import { fetchAllProducts } from 'src/app/store/product/product.selectors';
import * as moment from 'moment';
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

  downloadReport(): void {
    const header = ['Item Name', 'Available Quantity'];
    const body = this.products.map((product) => {
      return [product.title, product.quantity];
    });
    // Pushing header to table top
    body.unshift(header);

    const docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['auto', 'auto'],
            body,
          },
        },
      ],
    };

    this.pdfHelperService.downloadPdf(docDefinition);
  }

  downloadDetailReport(): void {
    const headers = ['Transaction Id', 'Date/Time', 'Type', 'Quantity'];
    const content = [];
    this.products.map((product) => {
      // Generating title & quatity heading of item
      content.push({
        text: `Item Name: ${product.title}`,
        style: 'subheader',
        bold: true,
      });
      content.push({
        text: `Available Quantity: ${product.quantity}`,
        bold: true,
        style: 'subheader',
      });
      const singleProductTrans = this.getTransationByProductId(product._id);
      // Generating transaction tables itemwise
      let finalTrans = [];
      if (singleProductTrans && singleProductTrans.length > 0) {
        // Generating rows
        finalTrans = singleProductTrans.map((trans) => [
          trans.transationId,
          moment(trans.createdAt).format('y-MM-d HH:mm:ss'),
          trans.transationType.toUpperCase(),
          trans.quantity,
        ]);
      }
      if (finalTrans.length > 0) {
        // Pushing header to table top
        finalTrans.unshift(headers);
        content.push({
          table: {
            body: finalTrans,
          },
        });
      }
      content.push({ text: '-------------------------------------', style: 'subheader' });
    });

    const docDefinition = {
      content,
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
    };

    this.pdfHelperService.downloadPdf(docDefinition);
  }
}
