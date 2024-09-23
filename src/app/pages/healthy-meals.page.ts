import { Component } from '@angular/core';
import { HealthyMealsPageComponent }
from "../components/healthy-meals-page/healthy-meals-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-healthy-meals',
  standalone: true,
  imports: [HealthyMealsPageComponent],
  template: '<app-healthy-meals-page />'
})
export default class HealthyMealsComponent {
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
    this.titleService.setTitle(metaTags.healthyMeals.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.healthyMeals.description },
      { name: "keywords", content: metaTags.healthyMeals.keywords },
      { name: "robots", content: metaTags.healthyMeals.robots },
      { name: "viewport", content: metaTags.healthyMeals.viewport }
    ]);
  }
}