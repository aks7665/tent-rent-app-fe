import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/product';

  create = (data) => {
    const url = `${this.baseUrl}`;
    return this.apiService.postDataApi(data, url);
  }

  getAll = () => {
    const url = `${this.baseUrl}`;
    return this.apiService.getDataApi(url);
  }
}
