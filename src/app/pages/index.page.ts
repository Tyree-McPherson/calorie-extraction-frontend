import { Component } from '@angular/core';
import { IndexPageComponent }
from '../components/index-page/index-page.component';
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [IndexPageComponent],
  template: '<app-index-page />'
})
export default class IndexComponent {
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
    this.titleService.setTitle(metaTags.index.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.index.description },
      { name: "keywords", content: metaTags.index.keywords },
      { name: "robots", content: metaTags.index.robots },
      { name: "viewport", content: metaTags.index.viewport }
    ]);
  }
}
