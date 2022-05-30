import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  
  isUserLogged: boolean = false;

  public persona:Persona[]=[];
  public editPersona:Persona | undefined;
  public deletePersona:Persona | undefined;
  
  constructor(private personaService:PersonaService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getPersona();

    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getPersona():void{
    this.personaService.getPersonas().subscribe({
      next: (response:Persona[]) => {
        this.persona = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    } 
    
    //Modal Editar  
    public onUpdatePersona(persona:Persona):void{
      this.editPersona = persona;
      this.personaService.putPersona(persona).subscribe({
        next: (response:Persona) => {
          console.log(response);
          this.getPersona();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, persona?:Persona):void{
      const container = document.getElementById('acerca-de'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addPersonaModal');
      }
      else if(mode === 'edit'){
        this.editPersona = persona;
        button.setAttribute('data-target', '#updatePersonaModal');  
      }
      else if(mode === 'delete'){
        this.deletePersona = persona;
        button.setAttribute('data-target', '#deletePersonaModal');  
      }
      container?.appendChild(button);
      button.click();
    }    
    
  }
  
      

      
  