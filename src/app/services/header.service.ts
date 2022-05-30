import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  
  //URL = 'http://localhost:8081/header';

  URL = 'https://fernandoarielgattari.herokuapp.com/header';

  constructor(private http:HttpClient) { }

  getHeader():Observable<any>{
    return this.http.get(this.URL);
  }

  getHeaderById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postHeader(header:any):Observable<any>{
    return this.http.post(this.URL,header);
  }

  putHeader(header:any):Observable<any>{
    return this.http.put(this.URL+"/"+header.id,header);
  }

  deleteHeader(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }
  
}


