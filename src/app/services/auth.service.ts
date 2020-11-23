import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) {}

  baseUrl = '/auth';

  login = (data) => {
    const url = `${this.baseUrl}/login`;
    return this.apiService.postDataApi(data, url);
  }

}
