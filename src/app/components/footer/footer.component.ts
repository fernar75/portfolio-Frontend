import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Footer } from 'src/app/models/footer';
import { AuthService } from 'src/app/services/auth.service';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isUserLogged: boolean = false;
  
  public footer:Footer[]=[];
  public editFooter:Footer | undefined;
  public deleteFooter:Footer | undefined;
  
  constructor(private footerService:FooterService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.getFooter();

    this.isUserLogged = this.authService.isUserLogged();
  }
  
  public getFooter():void{
    this.footerService.getFooter().subscribe({
      next: (response:Footer[]) => {
        this.footer = response;
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      } })     
      
      
    } 
    
    //Modal Editar  
    public onUpdateFooter(footer:Footer):void{
      this.editFooter = footer;
      this.footerService.putFooter(footer).subscribe({
        next: (response:Footer) => {
          console.log(response);
          this.getFooter();
        },
        error:(error:HttpErrorResponse) =>{
          alert(error.message);
        }
      })
    }
    
    
    //Modal
    public onOpenModal(mode:String, footer?:Footer):void{
      const container = document.getElementById('footer'); //ver el nombre de la class//
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode === 'add'){
        button.setAttribute('data-target', '#addFooterModal');
      }
      else if(mode === 'edit'){
        this.editFooter = footer;
        button.setAttribute('data-target', '#updateFooterModal');  
      }
      else if(mode === 'delete'){
        this.deleteFooter = footer;
        button.setAttribute('data-target', '#deleteFooterModal');  
      }
      container?.appendChild(button);
      button.click();
    }    
    
  }
  
  
  

  


