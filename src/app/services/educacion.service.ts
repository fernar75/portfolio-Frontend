import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8081/educacion';

  constructor(private http:HttpClient) { }

  getEducacion():Observable<any>{
    return this.http.get(this.URL);
  }

  getEducacionById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postEducacion(educacion:any):Observable<any>{
    return this.http.post(this.URL,educacion);
  }

  putEducacion(educacion:any):Observable<any>{
    return this.http.put(this.URL+"/"+educacion.id,educacion);
  }

  deleteEducacion(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }

}


