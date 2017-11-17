import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Accompanist} from '../app.model';

@Component({
  selector: 'app-accompanist-item',
  templateUrl: './accompanist-item.component.html',
  styleUrls: ['./accompanist-item.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AccompanistItemComponent implements OnInit {

  @Input()
  public accompanist: Accompanist;

  @Output()
  public delete = new EventEmitter<void>();
  @Output()
  public formChange = new EventEmitter<void>();

  @ViewChild('f')
  public form: NgForm;

  constructor() {
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.formChange.emit();
    });
  }

  public deleteAccompanist(): void {
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

