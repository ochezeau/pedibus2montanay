import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Child, Classe} from '../app.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ChildItemComponent implements OnInit {

  @Input()
  public child: Child;

  @Output()
  public delete = new EventEmitter<void>();
  @Output()
  public formChange = new EventEmitter<void>();

  @ViewChild('f')
  public form: NgForm;


  private classe = Classe;
  public classes = [];

  constructor() {
    this.classes = Object.keys(this.classe);
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit();
    });
  }

  public deleteChild(): void {
    this.delete.emit();
    this.formChange.emit();
  }

  public dayChange(): void {
    this.formChange.emit();
  }

  public get invalid(): boolean {
    return this.form.invalid;
  }
}
