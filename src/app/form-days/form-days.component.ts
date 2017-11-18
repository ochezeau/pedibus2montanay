import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { Person, PersonType, Ride, RideAccompanist, RideChild, RideEx } from "../app.model";
import { ControlContainer } from "@angular/forms";

@Component({
  selector: "app-form-days",
  templateUrl: "./form-days.component.html",
  styleUrls: ["./form-days.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class FormDaysComponent implements OnInit {
  public ride = Ride;
  public ridesEx = [];
  public ridePerson: Array<string>;

  @Input()
  public person: Person;

  @Input()
  public personeType: PersonType;

  @Output()
  public change = new EventEmitter<void>();

  @Output()
  public delete = new EventEmitter<void>();

  constructor(private container: ControlContainer) {
  }

  public ngOnInit(): void {
    this.ridesEx = Object.keys(this.ride).filter(r => RideEx.includes(Ride[r]));
    if (this.personeType === "child") {
      this.ridePerson = Object.keys(this.ride).filter(r => RideChild.includes(Ride[r]));
    } else {
      this.ridePerson = Object.keys(this.ride).filter(r => RideAccompanist.includes(Ride[r]));
    }
  }

  public dayChange(): void {
    this.change.emit();
  }

  public deletePerson(): void {
    this.delete.emit();
  }

  public clearException(): void {
    this.person.exMonday = undefined;
    this.person.exTuesday = undefined;
    this.person.exWednesday = undefined;
    this.person.exThursday = undefined;
    this.person.exFriday = undefined;
    this.change.emit();
  }
}
