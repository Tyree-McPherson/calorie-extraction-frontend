import { Component } from '@angular/core';
import { PrivacyPolicyPageComponent }
from "../components/privacy-policy-page/privacy-policy-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [PrivacyPolicyPageComponent],
  template: '<app-privacy-policy-page />'
})
export default class PrivacyPolicyComponent {
  constructor(private meta: Meta, private titleService: Title) { }

  /**
   * Lifecycle hook that is called when the component is initialized.
   * It sets the page's title and meta tags.
   */
  ngOnInit(): void {
    this.setMetaTags();
  }

  /**
   * Sets the page's title and meta tags.
   *
   * This function sets the title of the page and adds the following meta tags:
   * - description
   * - keywords
   * - robots
   * - viewport
   *
   * The function sets the meta tags from the metaTags.json file.
   */
  setMetaTags() {
    // Set the title of the page
    this.titleService.setTitle(metaTags.privacyPolicy.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.privacyPolicy.description },
      { name: "keywords", content: metaTags.privacyPolicy.keywords },
      { name: "robots", content: metaTags.privacyPolicy.robots },
      { name: "viewport", content: metaTags.privacyPolicy.viewport }
    ]);
  }
}