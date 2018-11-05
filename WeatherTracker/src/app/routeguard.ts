import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthentificationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    }
    if (this.authService.user) {
      return true;
    } else {
      console.log('access denied!');
      this.router.navigate(['login']);
      return false;
    }
  }
}