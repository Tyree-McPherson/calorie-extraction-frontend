import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-box',
  standalone: true,
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss'],
  imports: [RouterModule, CommonModule]
})
export class ProfileBoxComponent {

  @Input({ required: true }) title: string = "";
  @Input({ required: true }) link: string = "";
}
