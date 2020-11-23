import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfHelperService {

  constructor() { }

  /**
   *
   * @param pdfBody - Pdf body
   */
  downloadPdf(pdfBody): void {
    pdfMake.createPdf(pdfBody).download();
  }
}
