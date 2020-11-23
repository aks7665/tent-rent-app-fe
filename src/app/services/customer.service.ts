import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/customer';

  create = (data) => {
    const url = `${this.baseUrl}`;
    return this.apiService.postDataApi(data, url);
  }

  getAll = () => {
    const url = `${this.baseUrl}`;
    return this.apiService.getDataApi(url);
  }
}
