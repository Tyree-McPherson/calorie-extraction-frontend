import { Component } from '@angular/core';
import { VitaminsPageComponent }
from "../components/vitamins-page/vitamins-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-vitamins',
  standalone: true,
  imports: [VitaminsPageComponent],
  template: '<app-vitamins-page />',
})
export default class VitaminsComponent {
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
    this.titleService.setTitle(metaTags.vitamins.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.vitamins.description },
      { name: "keywords", content: metaTags.vitamins.keywords },
      { name: "robots", content: metaTags.vitamins.robots },
      { name: "viewport", content: metaTags.vitamins.viewport }
    ]);
  }
}