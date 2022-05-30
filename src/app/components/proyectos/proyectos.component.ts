import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  isUserLogged: boolean = false;
  
  public proyectos:Proyectos[]=[];
  public editProyectos:Proyectos | undefined;
  public deleteProyectos:Proyectos | undefined;
  
  constructor(private proyectosService:ProyectosService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getProyectos();

    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getProyectos():void{
    this.proyectosService.getProyectos().subscribe({
      next: (response:Proyectos[]) => {
        this.proyectos = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    }
    
    
    
    //Modal Agregar  
    public onAddProyectos(addForm:NgForm):void{
      document.getElementById('add-proyectos-form')?.click();
      this.proyectosService.postProyectos(addForm.value).subscribe({
        next: (response:Proyectos) => {
          console.log(response);
          this.getProyectos();
          addForm.reset();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      })
    }
    
    //Modal Editar  
    public onUpdateProyectos(proyectos:Proyectos):void{
      this.editProyectos = proyectos;
      this.proyectosService.putProyectos(proyectos).subscribe({
        next: (response:Proyectos) => {
          console.log(response);
          this.getProyectos();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    //Modal Eliminar    
    public onDeleteProyectos(id:number):void{
      this.proyectosService.deleteProyectos(id).subscribe({
        next: (response:void) => {
          console.log(response);
          this.getProyectos();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, proyectos?:Proyectos):void{
      const container = document.getElementById('proyectos'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addProyectosModal');
      }
      else if(mode === 'edit'){
        this.editProyectos = proyectos;
        button.setAttribute('data-target', '#updateProyectosModal');  
      }
      else if(mode === 'delete'){
        this.deleteProyectos = proyectos;
        button.setAttribute('data-target', '#deleteProyectosModal');  
      }
      container?.appendChild(button);
      button.click();
    }
    
    
  }
  
      


      

  