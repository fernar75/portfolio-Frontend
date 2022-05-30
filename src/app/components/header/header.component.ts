import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/models/header';
import { HeaderService } from 'src/app/services/header.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isUserLogged: boolean = false;
  
  public header:Header[]=[];
  public editHeader:Header | undefined;
  public deleteHeader:Header | undefined;
  
  constructor(private headerService:HeaderService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getHeader();
    
    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getHeader():void{
    this.headerService.getHeader().subscribe({
      next: (response:Header[]) => {
        this.header = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    } 

    logout(): void {
      this.authService.logout();
      this.isUserLogged = false;
      window.location.reload();
    }
    
    //Modal Editar  
    public onUpdateHeader(header:Header):void{
      this.editHeader = header;
      this.headerService.putHeader(header).subscribe({
        next: (response:Header) => {
          console.log(response);
          this.getHeader();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, header?:Header):void{
      const container = document.getElementById('header'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addHeaderModal');
      }
      else if(mode === 'edit'){
        this.editHeader = header;
        button.setAttribute('data-target', '#updateHeaderModal');  
      }
      else if(mode === 'delete'){
        this.deleteHeader = header;
        button.setAttribute('data-target', '#deleteHeaderModal');  
      }
      container?.appendChild(button);
      button.click();
    }    
    
  }
  
  
  //  Persona: any[] = 
  //  [
  //    {
  //      "id": 1,
  //      "urlBanner": "https://iili.io/W33trg.jpg"
  //  }
  //  ];
  
  
 
