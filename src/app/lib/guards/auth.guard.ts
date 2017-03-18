import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data["roles"] as Array<string>;
    let currentUserRole = sessionStorage.getItem('userRole');

    if(sessionStorage.getItem('currentUser')){
      if(roles == null || roles.indexOf(currentUserRole) != -1) {
        return true;
      }
      else{
        this.router.navigate(['/unAuthorized'], {queryParams: { returnUrl: state.url}});
        return false;
      }

    }

    this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
    return false;
  }
}
