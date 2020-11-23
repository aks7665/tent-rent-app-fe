import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/initialize';

  initializeRecords = () => {
    const url = `${this.baseUrl}`;
    return this.apiService.getDataApi(url);
  }
}
