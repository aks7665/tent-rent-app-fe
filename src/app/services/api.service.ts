import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  postDataApi(data, postURL): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + postURL,
      data
    );
  }

  getDataApi(postURL): Observable<any> {
    return this.http.get<any>(
      environment.apiUrl + postURL
    );
  }

  patchDataApi(data, postURL): Observable<any> {
    return this.http.patch<any>(
      environment.apiUrl + postURL,
      data
    );
  }

  deleteDataApi(postURL): Observable<any> {
    return this.http.delete<any>(
      environment.apiUrl + postURL
    );
  }
}
