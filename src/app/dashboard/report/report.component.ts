import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store';
import { fetchAllProducts } from 'src/app/store/product/product.selectors';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import { fetchAllTransactions } from 'src/app/store/transaction/transaction.selectors';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;
  products: Product[] = [];
  transactions: Transaction[];

  constructor(private store: Store<AppState>, private router: Router) {}

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

  // downloadPDF() {
  //   const doc = new jsPDF();

  //   const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   const content = this.content.nativeElement;

  //   doc.fromHTML(content.innerHTML, 15, 15, {
  //     width: 190,
  //     'elementHandlers': specialElementHandlers
  //   });

  //   doc.save('test.pdf');

  // const doc = new jsPDF();

  // var x = document.getElementById("myTd");
  // x.innerHTML = 'vhjgfjh';

  // const specialElementHandlers = {
  //   '#editor': function (element, renderer) {
  //     return true;
  //   }
  // };

  // const pdfTable = this.pdfTable.nativeElement;

  // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
  //   width: 190,
  //   'elementHandlers': specialElementHandlers
  // });

  // let DATA = this.pdfTable.nativeElement;
  // let doc = new jsPDF('p','pt', 'a4');

  // let handleElement = {
  //   '#editor':function(element,renderer){
  //     return true;
  //   }
  // };
  // doc.fromHTML(DATA.innerHTML,15,15,{
  //   'width': 200,
  //   'elementHandlers': handleElement
  // });

  // doc.save('angular-demo.pdf');
  // }
  // }
}
