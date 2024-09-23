import { Component } from '@angular/core';
import getYear from '../../functions/get-year';
import routes from '../../json/routes.json';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [RouterModule],
})
export class FooterComponent {
  getYear: Number = getYear();
  routeFaq: string = routes.faq;
  routeAbout: string = routes.about;
  routeContact: string = routes.contact;
  routeTermsOfUse: string = routes.termsOfUse;
  routePrivacyPolicy: string = routes.privacyPolicy;
  routePrefix: string = environment.routePrefix;
}
