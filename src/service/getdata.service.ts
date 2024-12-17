import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
baseUrls=(environment as any).baseUrl;
  constructor(private http:HttpClient) { }

  commonData(req:any):Observable<any>{
   const url=this.baseUrls+'/customdata/getdata';
   return this.http.post(url,req);
  }

  getData():Observable<any>{
    const url=this.baseUrls+'/image/getAllImage';
    return this.http.get(url);
   }

}
