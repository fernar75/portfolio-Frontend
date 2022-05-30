import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  //URL = 'http://localhost:8081/footer';

  URL = 'https://fernandoarielgattari.herokuapp.com/footer';

  constructor(private http:HttpClient) { }

  getFooter():Observable<any>{
    return this.http.get(this.URL);
  }

  getFooterById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postFooter(footer:any):Observable<any>{
    return this.http.post(this.URL,footer);
  }

  putFooter(footer:any):Observable<any>{
    return this.http.put(this.URL+"/"+footer.id,footer);
  }

  deleteFooter(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }
  
}
