import { Component } from '@angular/core';
import { YogaPageComponent }
from "../components/yoga-page/yoga-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-yoga',
  standalone: true,
  imports: [YogaPageComponent],
  template: '<app-yoga-page />',
})
export default class YogaComponent {
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
    this.titleService.setTitle(metaTags.yoga.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.yoga.description },
      { name: "keywords", content: metaTags.yoga.keywords },
      { name: "robots", content: metaTags.yoga.robots },
      { name: "viewport", content: metaTags.yoga.viewport }
    ]);
  }
}