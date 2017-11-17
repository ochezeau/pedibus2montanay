import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/take";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router/src/router_state";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState.map(auth => {
      if (!auth) {
        this.router.navigate(["/login"]);
        return false;
      } else {
        return true;
      }
    });
  }

}
