import { Component } from '@angular/core';
import { CalorieLossTrackerPageComponent }
from
"../components/calorie-loss-tracker-page/calorie-loss-tracker-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-calorie-loss-tracker',
  standalone: true,
  imports: [CalorieLossTrackerPageComponent],
  template: '<app-calorie-loss-tracker-page />'
})
export default class CalorieLossTrackerComponent {
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
    this.titleService.setTitle(metaTags.calorieLossTracker.title);

    // Add meta tags
    this.meta.addTags([
      {
        name: "description",
        content: metaTags.calorieLossTracker.description
      },
      { name: "keywords", content: metaTags.calorieLossTracker.keywords },
      { name: "robots", content: metaTags.calorieLossTracker.robots },
      { name: "viewport", content: metaTags.calorieLossTracker.viewport }
    ]);
  }
}