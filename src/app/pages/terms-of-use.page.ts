import { Component } from '@angular/core';
import { TermsOfUsePageComponent }
from "../components/terms-of-use-page/terms-of-use-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-terms-of-use',
  standalone: true,
  imports: [TermsOfUsePageComponent],
  template: '<app-terms-of-use-page />'
})
export default class TermsOfUseComponent {
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
    this.titleService.setTitle(metaTags.termsOfUse.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.termsOfUse.description },
      { name: "keywords", content: metaTags.termsOfUse.keywords },
      { name: "robots", content: metaTags.termsOfUse.robots },
      { name: "viewport", content: metaTags.termsOfUse.viewport }
    ]);
  }
}