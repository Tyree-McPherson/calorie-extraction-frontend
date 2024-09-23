import { CommonModule } from '@angular/common';
import {
  Component, Input, ChangeDetectionStrategy, Output, EventEmitter
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule, NativeDateAdapter
} from '@angular/material/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NativeDateAdapter, useClass: NativeDateAdapter }],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class FormFieldComponent {

  @Input({ required: true }) label: string = '';
  @Input({ required: true }) formSelectOptions: boolean = false;
  @Input({ required: true }) id: string = "";
  @Input() selectOptions: string[] = [];
  @Input() icon: string = "";
  @Input() hint: string = "";
  @Input() placeholder: string = "";
  @Input({ required: true }) type: string = "";
  @Input() prefix: string = "";
  @Input() suffix: string = "";
  @Input() iconSuffix: boolean = true;
  @Input() maxLength: string = "";
  @Input({ required: true }) error: boolean = false;
  @Input({ required: true }) value: string = "";
  @Input() iconClickable: boolean = false;

  private _model: string = "";

  @Input()
  /**
   * The value of the form field.
   * This is a two-way binding property. When the user changes the value of the
   * form field, the value of this property will be updated. When the value of
   * this property is updated, the value of the form field will be updated.
   */
  get model(): string {
    return this._model;
  }

  /**
   * Sets the value of the form field and emits the modelChange event.
   * When the value of this property is updated, the value of the form field
   * will be updated.
   * @param value The new value of the form field.
   */
  set model(value: string) {
    this._model = value;
    this.modelChange.emit(this._model);
  }

  @Output() modelChange = new EventEmitter<string>();
  @Output() selectionChanged = new EventEmitter<string>();
  @Output() onIconClick = new EventEmitter<string>();

  /**
   * Emits the selectionChanged event with the value of the MatSelectChange
   * when the select option changes.
   * @param event The MatSelectChange event.
   */
  onSelectionChange(event: MatSelectChange) {
    this.selectionChanged.emit(event.value);
  }

  /**
   * Emits the onIconClick event with the value of the form field
   * when the icon is clicked.
   */
  iconClick() {
    this.onIconClick.emit(this.value);
  }
}
