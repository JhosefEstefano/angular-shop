import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { order, Product } from './Interface/iProduct';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  api_url = environment.url_api;
  constructor(private _http: HttpClient) {}


  getProducts(){
    return  this._http.get<Product[]>(`${this.api_url}products`, {headers: new HttpHeaders({"Content-Type": "application/json;"}), responseType: 'json'} ).pipe(
      map((res: Product[]) => {
        return res;
      }),
      catchError((error) => this.handlerError(error))
    );
  }

  getProduct(pId: string){
    return  this._http.get<Product>(`${this.api_url}products/${pId}`, {headers: new HttpHeaders({"Content-Type": "application/json;"}), responseType: 'json'} ).pipe(
      map((res: Product) => {
        return res;
      }),
      catchError((error) => this.handlerError(error))
    );
  }

  postOrden(obj : order){
    return  this._http.post<order>(`${this.api_url}order`, obj).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error) => this.handlerError(error))
    );
  }

  private handlerError(err: any): Observable<never> {
    return throwError(err);
  }

}
