import { inject } from "@angular/core";

import { 
  ActivatedRouteSnapshot, 
  CanActivateFn, 
  Router, 
  RouterStateSnapshot 
} from "@angular/router";
import { AuthService } from "../services/authentication/auth.service";

export function authGuardFnGuard(allowedRoles: string[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let svc: AuthService = inject(AuthService)
    let router: Router = inject(Router);
    if (svc.isLoggedIn()) {
      if (svc.roleMatch(allowedRoles)) {
        return true;
      }
    }
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
    return false;
  };
}