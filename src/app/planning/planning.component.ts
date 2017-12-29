import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "../service/user.service";
import { PlanningService } from "../service/planning.service";
import * as moment from "moment";
import { DatabaseWrapper, DayPlanning, Planning, PlanningType } from "../app.model";
import { NotifService } from "../service/notif.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-planning",
  templateUrl: "./planning.component.html",
  styleUrls: ["./planning.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {
  public planning: Array<DayPlanning>;
  public showSpinner = true;
  public current = new Planning();
  public type: PlanningType;
  public history: Array<DatabaseWrapper<Planning>>;
  public historySelected: string;

  constructor(private userService: UserService, private planningService: PlanningService,
              private notifService: NotifService, private routeResolver: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    this.routeResolver.data.subscribe(data => {
      this.type = data["type"];
      if (this.type === "current") {
        this.initForCurrent();
      } else {
        this.initForHistory();
      }
    });
  }

  public getDayNumber(day: number): string {
    return moment().day(day + 1).week(this.current.week).year(this.current.year).format("DD");
  }

  public isDay(day: string): boolean {
    if (this.current.days && this.current.days.length === 0) {
      return true;
    }
    return this.current.days.includes(day);
  }

  public clearDays(): void {
    this.current.days = [];
    this.updateCurrent();
  }

  public updateCurrent(): void {
    this.planningService.setCurrent(this.current);
  }

  public savePlanning(): void {
    this.planningService.savePlanning(this.current, this.planning).then(() => {
      this.notifService.show("Planning " + this.planningService.getKeyPlanning(this.current) + " sauvé");
      this.planningService.deleteCurrent();
      this.router.navigate(["/history"]);
    });
  }

  public getHistoryKeys(): Array<string> {
    return this.history.map(h => h.key);
  }

  public selectPlanning(): void {
    const selected = this.history.filter(h => h.key === this.historySelected)[0];
    if (!selected.value.days) {
      selected.value.days = [];
    }
    this.current = selected.value;
    this.planning = selected.value.planning;
  }

  public printPlanning(): void {
    window.print();
  }

  private initForCurrent(): void {
    this.planningService.getCurrent().subscribe(c => {
      let frMoment = moment().locale("fr");
      const nextWeek = frMoment.subtract(4, "day").add(moment.duration(1, "week"));

      if (c && c.week === nextWeek.week() && c.year === nextWeek.year()) {
        this.current = c;
        if (!this.current.days) {
          this.current.days = [];
        }
      } else {
        this.current = new Planning();

        this.current.week = nextWeek.week();
        this.current.month = nextWeek.format("MMMM");
        this.current.year = nextWeek.year();
        this.planningService.setCurrent(this.current);
      }

      this.userService.getUsers().subscribe(u => {
        this.planning = this.userService.toPlanning(u);
        this.showSpinner = false;
      });
    });
  }

  private initForHistory(): void {
    this.planningService.getHistory().subscribe(h => {
      this.history = h.reverse();
      if (this.history.length > 0) {
        this.historySelected = this.history[0].key;
        this.selectPlanning();
      }
      this.showSpinner = false;
    });
  }
}
