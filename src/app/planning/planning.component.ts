import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from '../service/user.service';
import {CurrentPlanning, Planning} from '../app.model';
import {PlanningService} from '../service/planning.service';
import * as moment from 'moment';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningComponent implements OnInit {
  public planning: Planning;
  public showSpinner = true;
  public current = new CurrentPlanning();

  constructor(private userService: UserService, private planningService: PlanningService) {
  }

  public ngOnInit(): void {
    this.planningService.getCurrent().subscribe(c => {
      if (c) {
        this.current = c;
      } else {
        const nextWeek = moment().add(moment.duration(1, 'week'));
        this.current.week = nextWeek.week();
        this.current.year = nextWeek.year();
      }
    });

    this.userService.getUsers().subscribe(u => {
      this.planning = this.userService.toPlanning(u);
      this.showSpinner = false;
    });
  }

  public misAccompanistCount(accompanists: Array<string>, childs: Array<string>): number {
    if (childs.length / 7 > accompanists.length) {
      const mod = childs.length <= 7 ? 0 : childs.length % 7;
      return mod + 1 - accompanists.length;
    }
    return 0;
  }

  public isDay(day: string): boolean {
    if (this.current.days && this.current.days.length === 0) {
      return true;
    }
    return this.current.days.includes(day);
  }

  public clearDays(): void {
    this.current.days = [];
  }
}
