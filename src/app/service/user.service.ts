import { Injectable } from "@angular/core";
import { DatabaseWrapper, DayPlanning, Person, PersonPlanning, PersonPlanningDay, Ride, User } from "../app.model";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {
  private usersRef: AngularFireList<User>;
  private usersObs: Observable<Array<DatabaseWrapper<User>>>;
  private updateing = false;

  private readonly USER_PATH = "users";

  constructor(private db: AngularFireDatabase) {
    this.usersRef = this.db.list(this.USER_PATH);
    this.usersObs = this.usersRef.snapshotChanges().map(changes => {
      return changes.map(c => {
        return {key: c.payload.key, value: c.payload.val()};
      });
    });
  }

  public addUser(users: Array<DatabaseWrapper<User>>): Promise<void> {
    const maxKey = users.length === 0 ? 0 : parseInt(Math.max.apply(Math, users.map(u => u.key)), 10) + 1;
    const nUser = new User();
    nUser.name = "Famille : " + maxKey;
    return this.db.object(this.USER_PATH + "/" + maxKey).set(nUser);
  }

  public updateUser(user: DatabaseWrapper<User>): Promise<void> {
    const safeUser = JSON.parse(JSON.stringify(user.value)); // remove undefined value
    return this.usersRef.update(user.key, safeUser);
  }

  public deleteUser(user: DatabaseWrapper<User>): Promise<void> {
    return this.db.object(this.USER_PATH + "/" + user.key).remove();
  }

  public getUsers(): Observable<Array<DatabaseWrapper<User>>> {
    return this.usersObs;
  }

  public toPlanning(users: Array<DatabaseWrapper<User>>): Array<DayPlanning> {
    const p: Array<DayPlanning> = [];
    p.push(this.getDayPlanning("monday", "Lundi", users));
    p.push(this.getDayPlanning("tuesday", "Mardi", users));
    p.push(this.getDayPlanning("wednesday", "Mercredi", users));
    p.push(this.getDayPlanning("thursday", "Jeudi", users));
    p.push(this.getDayPlanning("friday", "Vendredi", users));
    return p;
  }

  public countByDay(list: Array<Person>, property: string): any {
    return list.reduce((r, c) => {
      const ride = this.getTrueRide(c, property);
      if (ride) {
        if (!r.hasOwnProperty(ride)) {
          r[ride] = 0;
        }
        r[ride]++;
      }
      return r;
    }, {});
  }

  private capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.substr(1);
  }

  private getDayPlanning(day: string, strDay: string, users: Array<DatabaseWrapper<User>>): DayPlanning {
    const dp = new DayPlanning();
    dp.day = strDay;
    dp.fAccompanists = this.personForDayAndRide(users, day, "accompanists", [Ride.FE, Ride.FP]);
    dp.fTel = this.personForDayAndRide(users, day, "accompanists", [Ride.FE_Tel]);
    dp.fChilds = this.personForDayAndRide(users, day, "childs", [Ride.FE, Ride.FP]);

    dp.pAccompanists = this.personForDayAndRide(users, day, "accompanists", [Ride.FE, Ride.PE, Ride.PB]);
    dp.pTel = this.personForDayAndRide(users, day, "accompanists", [Ride.PE_Tel]);
    dp.pChilds = this.personForDayAndRide(users, day, "childs", [Ride.FE, Ride.PE, Ride.PB]);

    dp.bAccompanists = this.personForDayAndRide(users, day, "accompanists", [Ride.FE, Ride.PE, , Ride.BE]);
    dp.bTel = this.personForDayAndRide(users, day, "accompanists", [Ride.BE_Tel]);
    dp.bChilds = this.personForDayAndRide(users, day, "childs", [Ride.FE, Ride.PE, , Ride.BE]);
    return dp;
  }

  private personForDayAndRide(users: Array<DatabaseWrapper<User>>, day: string, personeType: string, rides: Array<Ride>): Array<PersonPlanning> {
    const persones = this.getAllPersonPlanning(personeType, users);
    return persones.filter(p => {
      if (!p[day]) {
        return false;
      }

      return rides.includes(<any>Ride[p[day]]);
    }).map(p => {
      let pp = {familly: p.familly, firstName: p.firstName, phone: p.phone, classe: p.classe};
      return pp;
    });
  }

  private getAllPersonPlanning(personType: string, users: Array<DatabaseWrapper<User>>): Array<PersonPlanningDay> {
    return users.map(u => u.value).reduce((r: Array<PersonPlanningDay>, c: User) => {
      r.push(...this.getPersonPlanningForUser(personType, c));
      return r;
    }, []);
  }

  private getPersonPlanningForUser(personType: string, user: User): Array<PersonPlanningDay> {
    if (!user[personType]) {
      return [];
    }
    return user[personType].map(p => {
      const pp = new PersonPlanningDay();
      pp.firstName = p.firstName;
      pp.familly = user.name;
      if (personType === "accompanists") {
        pp.phone = p.phone;
      } else {
        pp.classe = p.classe;
      }
      pp.monday = this.getTrueRide(p, "monday");
      pp.tuesday = this.getTrueRide(p, "tuesday");
      pp.wednesday = this.getTrueRide(p, "wednesday");
      pp.thursday = this.getTrueRide(p, "thursday");
      pp.friday = this.getTrueRide(p, "friday");
      return pp;
    });
  }

  private getTrueRide(person: Person, day: string): Ride {
    let ride = person[day];
    const exRide = person["ex" + this.capitalize(day)];
    if (exRide) {
      ride = exRide;
    }
    return ride;
  }

  public exProp(day: string): string {
    return "ex" + this.capitalize(day);
  }

}
