import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { api_url } from "src/environments/environment";
import { tap, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public url = api_url.prod;
  constructor(private http: HttpClient) {}

  get(endpoint: any):Observable<any> {
    return this.http.get(this.url + endpoint).pipe(
      tap(resp => this.log(resp)));
  }

  post(endpoint: string, body: any):Observable<any> {
    return this.http.post(this.url + endpoint, body).pipe(
      tap(resp => this.log(resp)));
  }

  patch(endpoint: string, body: any):Observable<any> {
    return this.http.patch(this.url + endpoint, body).pipe(
      tap(resp => this.log(resp)));
  }

  deleteAuth(endpoint: String):Observable<any>{
    return this.http.delete(this.url + endpoint).pipe(
      tap(resp => this.log(resp)));
  }

  private toJson(res:any) {
    return res.json();
  }

  private log(res: any) {
    if (!environment.production) console.log(res)
  }
}