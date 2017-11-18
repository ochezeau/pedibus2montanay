export enum Ride { ABS = "ABS", FE = "FE", PE = "PE", BE = "BE", FP = "FP", PB = "PB", FE1_2 = "FE 1/2", PE1_2 = "PE 1/2", }

export enum Classe {PS = "PS", MS = "MS", GS = "GS", CP = "CP", CE1 = "CE1", CE2 = "CE2", CM1 = "CM1", CM2 = "CM2"}

/*export const Rides: Array<RideOption> = [
  {c: 'ABS', l: 'Absent'},
  {c: 'FE', l: 'Ferière -> Ecole'},
  {c: 'PE', l: 'Poype -> Ecole'},
  {c: 'BE', l: 'Barmelle -> Ecole'},
  {c: 'FP', l: 'Ferière -> Poype'},
  {c: 'PB', l: 'Poype -> Barmelle'},
  {c: 'FE 1/2', l: 'Ferière -> Ecole 1/2'},
  {c: 'PE 1/2', l: 'Poype -> Ecole 1/2'},
  {c: 'BE 1/2', l: 'Barmelle -> Ecole 1/2'},
  {c: 'FP 1/2', l: 'Ferière -> Poype 1/2'},
  {c: 'PB 1/2', l: 'Poype -> Barmelle 1/2'},
  {c: 'FE 1/3', l: 'Ferière -> Ecole 1/3'},
  {c: 'PE 1/3', l: 'Poype -> Ecole 1/3'},
  {c: 'BE 1/3', l: 'Barmelle -> Ecole 1/3'},
  {c: 'FP 1/3', l: 'Ferière -> Poype 1/3'},
  {c: 'PB 1/3', l: 'Poype -> Barmelle 1/3'},
  {c: 'FE 1/4', l: 'Ferière -> Ecole 1/4'},
  {c: 'PE 1/4', l: 'Poype -> Ecole 1/4'},
  {c: 'BE 1/4', l: 'Barmelle -> Ecole 1/4'},
  {c: 'FP 1/4', l: 'Ferière -> Poype 1/4'},
  {c: 'PB 1/4', l: 'Poype -> Barmelle 1/4'},
  {c: 'FE Oc', l: 'Ferière -> Ecole Oc'},
  {c: 'PE Oc', l: 'Poype -> Ecole Oc'},
  {c: 'BE Oc', l: 'Barmelle -> Ecole Oc'},
  {c: 'FP Oc', l: 'Ferière -> Poype Oc'},
  {c: 'PB Oc', l: 'Poype -> Barmelle Oc'},
];*/

export class DatabaseWrapper<T> {
  key: string;
  value: T;
}

export class User {
  name: string;
  email: string;
  accompanists: Array<Accompanist>;
  childs: Array<Child>;
  comment: string;
}

export abstract class Person {
  monday: Ride;
  tuesday: Ride;
  wednesday: Ride;
  thursday: Ride;
  friday: Ride;

  exMonday: Ride;
  exTuesday: Ride;
  exWednesday: Ride;
  exThursday: Ride;
  exFriday: Ride;
}

export class DayPlanning {
  day: string;
  fAccompanists: Array<string>;
  fChilds: Array<string>;
  pAccompanists: Array<string>;
  pChilds: Array<string>;
  bAccompanists: Array<string>;
  bChilds: Array<string>;

}

export class Accompanist extends Person {
  firstName: string;
  phone: string;
}

export class PersonPlanning {
  fullName: string;
  monday: Ride;
  tuesday: Ride;
  wednesday: Ride;
  thursday: Ride;
  friday: Ride;
}

export class Child extends Person {
  firstName: string;
  classe: Classe;
}

export class UsersFilter {
  familly: string;
  exception = false;
  occasional: Array<string> = [];
  ride: string;
  days: Array<string> = [];
  person: string;
}

export class Planning {
  week: number;
  year: number;
  days: Array<string> = [];
  planning: Array<DayPlanning>;
}

export type PlanningType = "current" | "history";

export class Credentials {
  login: string;
  password: string;
}
