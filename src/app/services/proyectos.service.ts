import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
//  URL = 'http://localhost:8081/proyectos';

    URL = 'https://fernandoarielgattari@herokuapp.com/proyectos';

  constructor(private http:HttpClient) { }

  getProyectos():Observable<any>{
    return this.http.get(this.URL);
  }

  getProyectosById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postProyectos(proyectos:any):Observable<any>{
    return this.http.post(this.URL,proyectos);
  }

  putProyectos(proyectos:any):Observable<any>{
    return this.http.put(this.URL+"/"+proyectos.id,proyectos);
  }

  deleteProyectos(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }

}
