import { Component } from '@angular/core';
import { ProfilePageComponent }
from '../components/profile-page/profile-page.component';
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfilePageComponent],
  template: `<app-profile-page />`
})
export default class ProfileComponent {
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
    this.titleService.setTitle(metaTags.profile.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.profile.description },
      { name: "keywords", content: metaTags.profile.keywords },
      { name: "robots", content: metaTags.profile.robots },
      { name: "viewport", content: metaTags.profile.viewport }
    ]);
  }
}
