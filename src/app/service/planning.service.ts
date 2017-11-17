import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {CurrentPlanning} from '../app.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PlanningService {
  private currentRef: AngularFireList<CurrentPlanning>;
  private currentObs: Observable<CurrentPlanning>;

  private readonly USER_PATH = 'planning/current';

  constructor(private db: AngularFireDatabase) {
  }

  public getCurrent(): Observable<CurrentPlanning> {
    return this.db.object(this.USER_PATH).valueChanges();
  }
}
