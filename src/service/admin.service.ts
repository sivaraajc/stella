import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
baseUrls=(environment as any).baseUrl;
  constructor(private http:HttpClient) { }

adminAddCaroselImage(req:any):Observable<any>{
  const url=this.baseUrls+'/image/addImage';
  return this.http.post(url,req);
}

adminEditCaroselImage(id: number, req: any): Observable<any> {
  const url = `${this.baseUrls}/image/updateImageById?id=${id}`;
  return this.http.put(url, req);
}

adminGetImageById(id: number): Observable<any> {
  const url = `${this.baseUrls}/image/getImageById?id=${id}`;
  return this.http.get(url);
}

adminDeleteImageById(id: number): Observable<any> {
  const url = `${this.baseUrls}/image/deleteImageById?id=${id}`;
  return this.http.delete(url);
}

adminAddProduct(url: string, req: FormData): Observable<any> {
  const completeUrl = `${this.baseUrls}${url}`; 
  return this.http.post(completeUrl, req);
}

adminUpdateProduct(formData: FormData): Observable<any> {
  const completeUrl = `${this.baseUrls}/product/updateproduct`;  
  return this.http.put(completeUrl, formData);
}
adminDeleteDeleteProductImage(id: number): Observable<any> {
  const url = `${this.baseUrls}/product/deleteproduct?id=${id}`;
  return this.http.delete(url);
}

}