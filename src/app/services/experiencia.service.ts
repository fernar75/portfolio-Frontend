import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  URL = 'http://localhost:8081/experiencia';

  constructor(private http:HttpClient) { }

  getExperiencia():Observable<any>{
    return this.http.get(this.URL);
  }

  getExperienciaById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postExperiencia(experiencia:any):Observable<any>{
    return this.http.post(this.URL,experiencia);
  }

  putExperiencia(experiencia:any):Observable<any>{  
    return this.http.put(this.URL+"/"+experiencia.id,experiencia);
  }

  deleteExperiencia(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }
  
}
