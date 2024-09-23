import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-privacy-policy-page',
  standalone: true,
  templateUrl: './privacy-policy-page.component.html',
  styleUrls: ['./privacy-policy-page.component.scss'],
  imports: []
})
export class PrivacyPolicyPageComponent {
  routePrefix: string = environment.routePrefix;
}