import { Component } from '@angular/core';
import { HealthyFoodPageComponent }
from "../components/healthy-food-page/healthy-food-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-healthy-food',
  standalone: true,
  imports: [HealthyFoodPageComponent],
  template: '<app-healthy-food-page />'
})
export default class HealthyFoodComponent {
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
    this.titleService.setTitle(metaTags.healthyFood.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.healthyFood.description },
      { name: "keywords", content: metaTags.healthyFood.keywords },
      { name: "robots", content: metaTags.healthyFood.robots },
      { name: "viewport", content: metaTags.healthyFood.viewport }
    ]);
  }
}