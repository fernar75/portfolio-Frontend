import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skills } from 'src/app/models/skills';
import { AuthService } from 'src/app/services/auth.service';
import { SkillsService } from 'src/app/services/skills.service';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

    isUserLogged: boolean = false;
    
    public skills:Skills[]=[];
    public editSkills:Skills | undefined;
    public deleteSkills:Skills | undefined;
    
    constructor(private skillsService:SkillsService, private authService: AuthService) { }
    
    ngOnInit(): void {
        this.getSkills();

        this.isUserLogged = this.authService.isUserLogged();
    }
    
    public getSkills():void{
        this.skillsService.getSkills().subscribe({
            next: (response:Skills[]) => {
                this.skills = response;
            },
            error: (error:HttpErrorResponse) => {
                alert(error.message);
            } })     
            
            
        }
        
        
        
        //Modal Agregar  
        public onAddSkills(addForm:NgForm):void{
            document.getElementById('add-skills-form')?.click();
            this.skillsService.postSkills(addForm.value).subscribe({
                next: (response:Skills) => {
                    console.log(response);
                    this.getSkills();
                    addForm.reset();
                },
                error: (error:HttpErrorResponse) => {
                    alert(error.message);
                    addForm.reset();
                }
            })
        }
        
        //Modal Editar  
        public onUpdateSkills(skills:Skills):void{
            this.editSkills = skills;
            this.skillsService.putSkills(skills).subscribe({
                next: (response:Skills) => {
                    console.log(response);
                    this.getSkills();
                },
                error:(error:HttpErrorResponse) =>{
                    alert(error.message);
                }
            })
        }
        
        //Modal Eliminar    
        public onDeleteSkills(id:number):void{
            this.skillsService.deleteSkills(id).subscribe({
                next: (response:void) => {
                    console.log(response);
                    this.getSkills();
                },
                error:(error:HttpErrorResponse) =>{
                    alert(error.message);
                }
            })
        }
        
        
        //Modal
        public onOpenModal(mode:String, skills?:Skills):void{
            const container = document.getElementById('skill'); //ver el nombre de la class//
            const button = document.createElement('button');
            button.type = 'button';
            button.style.display = 'none';
            button.setAttribute('data-toggle', 'modal');
            if(mode === 'add'){
                button.setAttribute('data-target', '#addSkillsModal');
            }
            else if(mode === 'edit'){
                this.editSkills = skills;
                button.setAttribute('data-target', '#updateSkillsModal');  
            }
            else if(mode === 'delete'){
                this.deleteSkills = skills;
                button.setAttribute('data-target', '#deleteSkillsModal');  
            }
            container?.appendChild(button);
            button.click();
        }
        
        
    }
    