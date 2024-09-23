import { Component } from '@angular/core';
import { MassagesPageComponent }
from "../components/massages-page/massages-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-massages',
  standalone: true,
  imports: [MassagesPageComponent],
  template: '<app-massages-page />',
})
export default class MassagesComponent {
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
    this.titleService.setTitle(metaTags.massages.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.massages.description },
      { name: "keywords", content: metaTags.massages.keywords },
      { name: "robots", content: metaTags.massages.robots },
      { name: "viewport", content: metaTags.massages.viewport }
    ]);
  }
}