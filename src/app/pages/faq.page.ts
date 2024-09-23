import { Component } from '@angular/core';
import { FaqPageComponent } from "../components/faq-page/faq-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FaqPageComponent],
  template: '<app-faq-page />'
})
export default class FaqComponent {
  constructor(private meta: Meta, private titleService: Title) { }

  /**
   * Lifecycle hook that is called after the component is initialized.
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
    this.titleService.setTitle(metaTags.faq.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.faq.description },
      { name: "keywords", content: metaTags.faq.keywords },
      { name: "robots", content: metaTags.faq.robots },
      { name: "viewport", content: metaTags.faq.viewport }
    ]);
  }
}