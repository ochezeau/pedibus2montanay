import {Component, EventEmitter, Input, Output, ViewChildren, ViewEncapsulation} from '@angular/core';
import {Child, User} from '../app.model';
import {ChildItemComponent} from '../child-item/child-item.component';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ChildListComponent {

  @Input()
  public user: User;

  @Output()
  public childListChange = new EventEmitter<void>();

  @ViewChildren(ChildItemComponent)
  public childComponents: Array<ChildItemComponent>;

  constructor() {
  }

  public addChild(): void {
    if (!this.user.childs) {
      this.user.childs = [];
    }
    this.user.childs.push(new Child());
  }

  public deleteChild(index: number): void {
    this.user.childs.splice(index, 1);
  }

  public get invalid(): boolean {
    if (!this.childComponents) {
      return false;
    }
    return this.childComponents.find(c => c.invalid) !== undefined;
  }

  public childFormChange(): void {
    this.childListChange.emit();
  }
}
