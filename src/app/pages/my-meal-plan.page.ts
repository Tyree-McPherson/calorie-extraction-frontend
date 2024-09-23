import { Component } from '@angular/core';
import { MyMealPlanPageComponent }
from "../components/my-meal-plan-page/my-meal-plan-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-my-meal-plan',
  standalone: true,
  imports: [MyMealPlanPageComponent],
  template: '<app-my-meal-plan-page />'
})
export default class MyMealPlanComponent {
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
    this.titleService.setTitle(metaTags.myMealPlan.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.myMealPlan.description },
      { name: "keywords", content: metaTags.myMealPlan.keywords },
      { name: "robots", content: metaTags.myMealPlan.robots },
      { name: "viewport", content: metaTags.myMealPlan.viewport }
    ]);
  }
}