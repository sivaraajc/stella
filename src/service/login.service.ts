import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
baseUrls=(environment as any).baseUrl;
  constructor(private http:HttpClient) { }

  login(data:any){
    const url=this.baseUrls+'/user/login';
    return this.http.post(url,data)
  }

  register(data:any){
    const url=this.baseUrls+'/user/register';
    return this.http.post(url,data)
  }


}
