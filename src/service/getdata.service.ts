import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  baseUrls = (environment as any).baseUrl;
  constructor(private http: HttpClient) { }

  commonData(req: any): Observable<any> {
    const url = this.baseUrls + '/customdata/getdata';
    return this.http.post(url, req);
  }

  getData(): Observable<any> {
    const url = this.baseUrls + '/image/getAllImage';
    return this.http.get(url);
  }

  //ADD TO CART
  addToCard(req: any): Observable<any> {
    const url = this.baseUrls + '/cart/add';
    return this.http.post(url, req);
  }
addToCardUserList(req:any):Observable<any>{
  const url = this.baseUrls + '/cart/getbyuserid/'+req;
  return this.http.get(url);
}

addToCardDelete(req:any):Observable<any>{
  const url = this.baseUrls + '/cart/delete/'+req;
  return this.http.delete(url);
}


addToCartQuantityUpdate(req:any):Observable<any>{
  const url = this.baseUrls + '/cart/update';
  return this.http.post(url,req);

}

addressAdd(req:any):Observable<any>{
  const url = this.baseUrls + '/address/add';
  return this.http.post(url,req);
}

paymentQrGenerate(amount: number): Observable<any> {
  const url = `${this.baseUrls}/paymentqr/generateQRCode/${amount}`; 
  return this.http.get(url);
}

uniqueOrderId():Observable<any>{
  const url = `${this.baseUrls}/paymentqr/generate/uuid`; 
  return this.http.get(url);
}


}
