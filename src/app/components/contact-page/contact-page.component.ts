import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  imports: [
    MatIconModule
  ]
})
export class ContactPageComponent {
  routePrefix: string = environment.routePrefix;
}