import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import { DatabaseWrapper, DayPlanning, Planning } from "../app.model";

@Injectable()
export class PlanningService {

  private readonly CURRENT_PATH = "planning/current";
  private readonly HISTORY_PATH = "planning/history";

  constructor(private db: AngularFireDatabase) {
  }

  public getCurrent(): Observable<Planning> {
    return this.db.object(this.CURRENT_PATH).valueChanges();
  }

  public setCurrent(current: Planning): Promise<void> {
    return this.db.object(this.CURRENT_PATH).update(current);
  }

  public deleteCurrent(): Promise<void> {
    return this.db.object(this.CURRENT_PATH).remove();
  }

  public savePlanning(current: Planning, dayPlanning: Array<DayPlanning>): Promise<void> {
    const toSave = this.cloneCurrent(current);
    toSave.planning = this.cloneCurrent(dayPlanning);
    return this.db.object(this.HISTORY_PATH + "/" + this.getKeyPlanning(current)).update(toSave);
  }

  public getKeyPlanning(p: Planning): string {
    return p.year + "-" + p.week;
  }

  public cloneCurrent<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

  public getHistory(): Observable<Array<DatabaseWrapper<Planning>>> {
    return this.db.list(this.HISTORY_PATH).snapshotChanges().map(changes => {
      return changes.map(c => {
        return {key: c.payload.key, value: c.payload.val()};
      });
    });
  }

}
