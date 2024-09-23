import { Component } from '@angular/core';
import { AboutPageComponent }
from "../components/about-page/about-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutPageComponent],
  template: '<app-about-page />'
})
export default class AboutComponent {
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
   */
  setMetaTags() {
    // Set the title of the page
    this.titleService.setTitle(metaTags.about.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.about.description },
      { name: "keywords", content: metaTags.about.keywords },
      { name: "robots", content: metaTags.about.robots },
      { name: "viewport", content: metaTags.about.viewport }
    ]);
  }
}