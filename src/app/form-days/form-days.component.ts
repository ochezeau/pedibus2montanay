import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Person, Ride} from '../app.model';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-form-days',
  templateUrl: './form-days.component.html',
  styleUrls: ['./form-days.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FormDaysComponent {
  private ride = Ride;
  public rides = [];

  @Input()
  public person: Person;

  @Output()
  public change = new EventEmitter<void>();

  @Output()
  public delete = new EventEmitter<void>();


  constructor(private container: ControlContainer) {
    this.rides = Object.keys(this.ride);
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
