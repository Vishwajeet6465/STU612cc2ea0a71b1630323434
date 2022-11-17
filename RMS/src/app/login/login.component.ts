import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
login:Login=new Login();
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  signIn(loginForm:NgForm){
    if(loginForm.valid){
      if(this.login.email === 'admin@gmail.com' && this.login.password === 'Admin@123'){
        this.router.navigate(['/dashboard']);
      }
    }
  }

}

export class Login{
  email:string;
  password:string;

  constructor(){
    this.email = '';
    this.password='';
  }
}
