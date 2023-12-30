import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private authSevice:  AuthService,
    private router:Router
  ){
    console.log(this.isLoggedIn)
  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: { matches: any; }) => result.matches),
      shareReplay()
    );
    get username (){
      return this.authSevice.userName;
    }
    get isLoggedIn()
    {
      return this.authSevice.isLoggedIn();
    }
    logout(){
      this.authSevice.logout();
      this.router.navigateByUrl('/login')
    }
}
