import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/authentication/login-model';
import { LoginService } from '../../services/authentication/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:LoginModel={};
  returnUrl:string="/admin";
  constructor(
    private loginService:LoginService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){
    this.loginService.getEmitter().subscribe(x => {
      if (x === "login") {
        this.router.navigateByUrl(this.returnUrl);
        
      }
      if (x === "logout") {
        console.log("login");
      }
     
       
      });
  }
  
  login(f:NgForm){
    console.log(this.data);
    this.loginService.login(this.data);
    
    
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      q =>{
        this.returnUrl = q['returnUrl'] ?? '/admin'
      }
    )
  }
}