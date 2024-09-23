import { Component } from '@angular/core';
import { CalorieIntakeTrackerPageComponent }
from
"../components/calorie-intake-tracker-page/calorie-intake-tracker-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-calorie-intake-tracker',
  standalone: true,
  imports: [CalorieIntakeTrackerPageComponent],
  template: '<app-calorie-intake-tracker-page />'
})
export default class CalorieIntakeTrackerComponent {
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
    this.titleService.setTitle(metaTags.calorieIntakeTracker.title);

    // Add meta tags
    this.meta.addTags([
      {
        name: "description",
        content: metaTags.calorieIntakeTracker.description
      },
      { name: "keywords", content: metaTags.calorieIntakeTracker.keywords },
      { name: "robots", content: metaTags.calorieIntakeTracker.robots },
      { name: "viewport", content: metaTags.calorieIntakeTracker.viewport }
    ]);
  }
}