import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';
import { AuthService } from 'src/app/services/auth.service';
import { EducacionService } from 'src/app/services/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  isUserLogged: boolean = false;
  
  public educacion:Educacion[]=[];
  public editEducacion:Educacion | undefined;
  public deleteEducacion:Educacion | undefined;
  
  
  constructor(private educacionService:EducacionService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getEducacion();

    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getEducacion():void{
    this.educacionService.getEducacion().subscribe({
      next: (response:Educacion[]) => {
        this.educacion = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    }
    
    
    
    //Modal Agregar  
    public onAddEducacion(addForm:NgForm):void{
      document.getElementById('add-educacion-form')?.click();
      this.educacionService.postEducacion(addForm.value).subscribe({
        next: (response:Educacion) => {
          console.log(response);
          this.getEducacion();
          addForm.reset();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      })
    }
    
    //Modal Editar  
    public onUpdateEducacion(educacion:Educacion):void{
      this.editEducacion = educacion;
      this.educacionService.putEducacion(educacion).subscribe({
        next: (response:Educacion) => {
          console.log(response);
          this.getEducacion();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    //Modal Eliminar    
    public onDeleteEducacion(id:number):void{
      this.educacionService.deleteEducacion(id).subscribe({
        next: (response:void) => {
          console.log(response);
          this.getEducacion();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, educacion?:Educacion):void{
      const container = document.getElementById('educacion'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addEducacionModal');
      }
      else if(mode === 'edit'){
        this.editEducacion = educacion;
        button.setAttribute('data-target', '#updateEducacionModal');  
      }
      else if(mode === 'delete'){
        this.deleteEducacion = educacion;
        button.setAttribute('data-target', '#deleteEducacionModal');  
      }
      container?.appendChild(button);
      button.click();
    }
    
    
  }
  