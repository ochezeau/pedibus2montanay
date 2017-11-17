import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit {
  public auth = false;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  public ngOnInit(): void {
    this.afAuth.authState.subscribe(a => this.auth = (a !== null));
  }

  public doExit(): void {
    this.afAuth.auth.signOut().then(r => {
      this.router.navigate(["/login"]);
    });
  }
}
