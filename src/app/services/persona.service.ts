import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  
  //URL = 'http://localhost:8081/personas';

  URL = 'https://fernandoarielgattari.herokuapp.com/personas';

  constructor(private http:HttpClient) { }

  getPersonas():Observable<any>{
    return this.http.get(this.URL);
  }

  getPersonaById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postPersona(persona:any):Observable<any>{
    return this.http.post(this.URL,persona);
  }

  putPersona(persona:any):Observable<any>{
    return this.http.put(this.URL+"/"+persona.id,persona);
  }

  deletePersona(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }
  
}
