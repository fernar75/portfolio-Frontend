import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
//  URL = 'http://localhost:8081/skills';

    URL = 'https://fernandoarielgattari@herokuapp.com/skills';

  constructor(private http:HttpClient) { }

  getSkills():Observable<any>{
    return this.http.get(this.URL);
  }

  getSkillsById(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id);
  }

  postSkills(skills:any):Observable<any>{
    return this.http.post(this.URL,skills);
  }

  putSkills(skills:any):Observable<any>{
    return this.http.put(this.URL+"/"+skills.id,skills);
  }

  deleteSkills(id:number):Observable<any>{
    return this.http.delete(this.URL+"/"+id);
  }
  
}
