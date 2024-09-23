import { Component } from '@angular/core';
import { WorkoutsPageComponent }
from "../components/workouts-page/workouts-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [WorkoutsPageComponent],
  template: '<app-workouts-page />'
})
export default class WorkoutsComponent {
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
    this.titleService.setTitle(metaTags.workouts.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.workouts.description },
      { name: "keywords", content: metaTags.workouts.keywords },
      { name: "robots", content: metaTags.workouts.robots },
      { name: "viewport", content: metaTags.workouts.viewport }
    ]);
  }
}
