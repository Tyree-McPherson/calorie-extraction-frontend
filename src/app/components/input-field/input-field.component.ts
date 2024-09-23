import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  imports: [
    FormsModule, MatFormFieldModule,
    MatInputModule, MatIconModule, CommonModule
  ],
})
export class InputFieldComponent {

  @Input() label: string = '';
  @Input() type: string = '';
  @Input() autofocus: boolean = false;
  @Input() disabled: boolean = false;
  @Input({ required: true }) maxLength: number = 30;
  @Input() name: string = '';
  @Input({ required: true }) placeholder: string = '';
  @Input() value: string = '';
  @Input() icon: string = '';
  @Input() bottomText: string = '';
  @Input() id: string = '';
  @Input() keyup: Function = () => {};
  @Input() bottomTextRed: boolean = false;
  passwordVisible: boolean = false;

  /**
   * Toggles the visibility of a password input field.
   *
   * When the input field's type is "password", clicking the icon will toggle
   * the visibility of the password. If the type is not "password", this
   * function does nothing.
   */
  iconClick() {
    if (this.type !== 'password') return

    this.passwordVisible = !this.passwordVisible
  };
}
