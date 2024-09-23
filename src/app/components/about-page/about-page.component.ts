import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  imports: [MatIconModule]
})
export class AboutPageComponent {
  routePrefix: string = environment.routePrefix;
}