export enum Ride {
  ABS = "ABS", FE = "FE", PE = "PE", BE = "BE", FP = "FP", FB = "FB", PB = "PB",
  FE1_2 = "FE 1/2", PE1_2 = "PE 1/2", BE1_2 = "BE 1/2", FP1_2 = "FP 1/2", PB1_2 = "PB 1/2",
  FE1_3 = "FE 1/3", PE1_3 = "PE 1/3", BE1_3 = "BE 1/3", FP1_3 = "FP 1/3", PB1_3 = "PB 1/3",
  FE1_4 = "FE 1/4", PE1_4 = "PE 1/4", BE1_4 = "BE 1/4", FP1_4 = "FP 1/4", PB1_4 = "PB 1/4",
  FE_Oc = "FE Oc", PE_Oc = "PE Oc", BE_Oc = "BE Oc",
  FE_Tel = "FE Tel", PE_Tel = "PE Tel", BE_Tel = "BE Tel"
}

export const RideEx: Array<Ride> = [
  Ride.ABS, Ride.FE, Ride.PE, Ride.BE, Ride.FP, Ride.FB, Ride.PB
];

export const RideChild: Array<Ride> = [
  Ride.FE, Ride.PE, Ride.BE
];

export const RideAccompanist: Array<Ride> = [
  Ride.FE, Ride.PE, Ride.BE, Ride.FP, Ride.FB, Ride.PB,
  Ride.FE1_2, Ride.PE1_2, Ride.BE1_2, Ride.FP1_2, Ride.PB1_2,
  Ride.FE1_3, Ride.PE1_3, Ride.BE1_3, Ride.FP1_3, Ride.PB1_3,
  Ride.FE1_4, Ride.PE1_4, Ride.BE1_4, Ride.FP1_4, Ride.PB1_4,
  Ride.FE_Oc, Ride.PE_Oc, Ride.BE_Oc,
  Ride.FE_Tel, Ride.PE_Tel, Ride.BE_Tel
];

export enum Classe {PS = "PS", MS = "MS", GS = "GS", CP = "CP", CE1 = "CE1", CE2 = "CE2", CM1 = "CM1", CM2 = "CM2"}

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
  fAccompanists: Array<PersonPlanning>;
  fTel: Array<PersonPlanning>;
  fChilds: Array<PersonPlanning>;
  pAccompanists: Array<PersonPlanning>;
  pTel: Array<PersonPlanning>;
  pChilds: Array<PersonPlanning>;
  bAccompanists: Array<PersonPlanning>;
  bTel: Array<PersonPlanning>;
  bChilds: Array<PersonPlanning>;

}

export class Accompanist extends Person {
  firstName: string;
  phone: string;
}

export class PersonPlanning {
  familly: string;
  firstName: string;
  phone: string;
  classe: string;
}

export class PersonPlanningDay extends PersonPlanning {
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
  month: string;
  days: Array<string> = [];
  planning: Array<DayPlanning>;
}

export type PlanningType = "current" | "history";

export type PersonType = "child" | "accompanist";

export class Credentials {
  login: string;
  password: string;
}
