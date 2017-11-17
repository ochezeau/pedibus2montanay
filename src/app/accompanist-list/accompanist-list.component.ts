import {Component, EventEmitter, Input, Output, ViewChildren, ViewEncapsulation} from '@angular/core';
import {AccompanistItemComponent} from '../accompanist-item/accompanist-item.component';
import {Accompanist, User} from '../app.model';

@Component({
  selector: 'app-accompanist-list',
  templateUrl: './accompanist-list.component.html',
  styleUrls: ['./accompanist-list.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AccompanistListComponent {
  @Input()
  public user: User;

  @Output()
  public accompanistListChange = new EventEmitter<void>();

  @ViewChildren(AccompanistItemComponent)
  public accompanistComponents: Array<AccompanistItemComponent>;

  constructor() {
  }

  public addAccompanist(): void {
    if (!this.user.accompanists) {
      this.user.accompanists = [];
    }
    this.user.accompanists.push(new Accompanist());
  }

  public deleteAccompanist(index: number): void {
    this.user.accompanists.splice(index, 1);
  }

  public get invalid(): boolean {
    if (!this.accompanistComponents) {
      return false;
    }
    return this.accompanistComponents.find(a => a.invalid) !== undefined;
  }

  public accompanistFormChange(): void {
    this.accompanistListChange.emit();
  }

}
