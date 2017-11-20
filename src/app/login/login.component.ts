import { Component, ViewEncapsulation } from "@angular/core";
import { Credentials } from "../app.model";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import { NotifService } from "../service/notif.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  public credentials = new Credentials();

  constructor(public afAuth: AngularFireAuth, private router: Router, private notifService: NotifService) {

  }

  public doLogin(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.credentials.login, this.credentials.password).then(r => {
      this.router.navigate(["/"]);
    }).catch(r => this.notifService.show("Erreur d'authentification"));
  }

}
