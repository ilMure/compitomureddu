import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  showLogin: boolean = true;
  showRegistration: boolean = false;
  messageManager: string = "";
  serverResponse: any = null;

  constructor(public loginService: LoginService){};

  showRegistrationForm(){
    this.showRegistration = true;
    this.showLogin = false;
  }

  showLoginForm(){
    this.showRegistration = false;
    this.showLogin = true;
  }

  submitLoginForm(form: NgForm){
    if (!(form.value.username.trim() == "" || form.value.password.trim() == "")){
      const data = 
      {
        "password" : ""+form.value.password+"",
        "username": ""+form.value.password+""
      };
      // il secondo parametro è true in quanto si desidera eseguire il post per il login
      this.loginService.post(data, true).subscribe(remoteData => {
        this.serverResponse = remoteData;
        if (this.serverResponse.valid){
          this.messageManager = "Benvenuto nel sito";
          this.showLogin = false;
        }else{
          this.messageManager = "Errore: username e/o password non corretti";
        }   
      });             
    }
    else{
      this.messageManager = "Non sono stati compilati tutti i campi";
    }
  }

  submitRegistrationForm(form: NgForm){
    if (!(form.value.username.trim() == "" || form.value.password.trim() == "")){
      const data = 
      {
        "name" : ""+form.value.name+"",
        "surname" : ""+form.value.surname+"",
        "password" : ""+form.value.password+"",
        "username": ""+form.value.password+"",
        "email": ""+form.value.email+""
      };
      // il secondo parametro è false in quanto si desidera eseguire il post per la register
      this.loginService.post(data, false).subscribe(remoteData => {
        this.serverResponse = remoteData;
      });        
      
      this.showRegistration = false;
      this.showLogin = true;

      this.messageManager = "Registrazione avvenuta con successo";
    }
    else{
      this.messageManager = "Non sono stati compilati tutti i campi obbligatori (username & password)";
    }
  }
}
