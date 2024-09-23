import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: '<h1>Page Not Found. Error 404</h1>'
})
export default class PageNotFoundComponent {
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
    this.titleService.setTitle(metaTags.pageNotFound.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.pageNotFound.description },
      { name: "keywords", content: metaTags.pageNotFound.keywords },
      { name: "robots", content: metaTags.pageNotFound.robots },
      { name: "viewport", content: metaTags.pageNotFound.viewport }
    ]);
  }
}
