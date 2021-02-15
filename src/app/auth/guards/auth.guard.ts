import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificarAutenticacion().pipe(
        tap( autenticado => {
          if(!autenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );
      // if(this.authService.auth.id) {
      //   return true;
      // }
      // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificarAutenticacion().pipe(
        tap( autenticado => {
          if(!autenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      );
      // if(this.authService.auth.id) {
      //   return true;
      // }
      // return false;
  }
}
