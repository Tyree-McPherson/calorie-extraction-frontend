import { Component } from '@angular/core';
import { ContactPageComponent }
from "../components/contact-page/contact-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactPageComponent],
  template: '<app-contact-page />'
})
export default class ContactComponent {
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
    this.titleService.setTitle(metaTags.contact.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.contact.description },
      { name: "keywords", content: metaTags.contact.keywords },
      { name: "robots", content: metaTags.contact.robots },
      { name: "viewport", content: metaTags.contact.viewport }
    ]);
  }
}