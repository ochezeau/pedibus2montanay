import { Component, Input, OnInit } from "@angular/core";
import { DayPlanning, PersonPlanningDay, PersonType } from "../app.model";

@Component({
  selector: "app-planning-list-person",
  templateUrl: "./planning-list-person.component.html",
  styleUrls: ["./planning-list-person.component.sass"]
})
export class PlanningListPersonComponent implements OnInit {

  private readonly ACC_PER_CHILD = 8;

  @Input()
  public type: PersonType;

  @Input()
  public planning: DayPlanning;

  @Input()
  public prefix: string;

  public persons: Array<PersonPlanningDay>;
  public tels: Array<PersonPlanningDay>;

  constructor() {
  }

  public ngOnInit(): void {
    const prop = this.type === "accompanist" ? "Accompanists" : "Childs";
    this.persons = this.planning[this.prefix + prop];

    if (this.type === "accompanist") {
      this.tels = this.planning[this.prefix + "Tel"];
    }
  }

  public getCount(): number {
    if (!this.persons) {
      return 0;
    }
    return this.persons.length;
  }

  public misAccompanistCount(): number {
    let accompanists = this.planning[this.prefix + "Accompanists"];
    let childs = this.planning[this.prefix + "Childs"];
    const aCount = accompanists ? accompanists.length : 0;
    const cCount = childs ? childs.length : 0;
    return (cCount - cCount % this.ACC_PER_CHILD) / this.ACC_PER_CHILD + 1 - aCount;
  }

}
