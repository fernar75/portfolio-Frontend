import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { AuthService } from 'src/app/services/auth.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  isUserLogged: boolean = false;
  
  public experiencia:Experiencia[]=[];
  public editExperiencia:Experiencia | undefined;
  public deleteExperiencia:Experiencia | undefined;
  
  constructor(private experienciaService:ExperienciaService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getExperiencia();

    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getExperiencia():void{
    this.experienciaService.getExperiencia().subscribe({
      next: (response:Experiencia[]) => {
        this.experiencia = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    }
    
    
    
    //Modal Agregar  
    public onAddExperiencia(addForm:NgForm):void{
      document.getElementById('add-experiencia-form')?.click();
      this.experienciaService.postExperiencia(addForm.value).subscribe({
        next: (response:Experiencia) => {
          console.log(response);
          this.getExperiencia();
          addForm.reset();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      })
    }
    
    //Modal Editar  
    public onUpdateExperiencia(experiencia:Experiencia):void{
      this.editExperiencia = experiencia;
      this.experienciaService.putExperiencia(experiencia).subscribe({
        next: (response:Experiencia) => {
          console.log(response);
          this.getExperiencia();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    //Modal Eliminar    
    public onDeleteExperiencia(id:number):void{
      this.experienciaService.deleteExperiencia(id).subscribe({
        next: (response:void) => {
          console.log(response);
          this.getExperiencia();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, experiencia?:Experiencia):void{
      const container = document.getElementById('experiencia'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addExperienciaModal');
      }
      else if(mode === 'edit'){
        this.editExperiencia = experiencia;
        button.setAttribute('data-target', '#updateExperienciaModal');  
      }
      else if(mode === 'delete'){
        this.deleteExperiencia = experiencia;
        button.setAttribute('data-target', '#deleteExperienciaModal');  
      }
      container?.appendChild(button);
      button.click();
    }
    
    
  }
  

      
     
      

  