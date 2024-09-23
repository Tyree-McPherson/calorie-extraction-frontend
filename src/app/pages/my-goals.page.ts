import { Component } from '@angular/core';
import { MyGoalsPageComponent }
from "../components/my-goals-page/my-goals-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-my-goals',
  standalone: true,
  imports: [MyGoalsPageComponent],
  template: '<app-my-goals-page />'
})
export default class MyGoalsComponent {
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
    this.titleService.setTitle(metaTags.myGoals.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.myGoals.description },
      { name: "keywords", content: metaTags.myGoals.keywords },
      { name: "robots", content: metaTags.myGoals.robots },
      { name: "viewport", content: metaTags.myGoals.viewport }
    ]);
  }
}
