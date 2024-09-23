import { Component } from '@angular/core';
import { BodyMassIndexCalculatorPageComponent }
from "../components/body-mass-index-calculator-page/body-mass-index-calculator-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-body-mass-index-calculator',
  standalone: true,
  imports: [BodyMassIndexCalculatorPageComponent],
  template: '<app-body-mass-index-calculator-page />',
})
export default class BodyMassIndexCalculatorComponent {
  constructor(private meta: Meta, private titleService: Title) { }

  /**
   * Initializes the component after Angular first displays the data-bound
   * properties and sets the directive or component's input properties.
   *
   * This function sets the meta tags for the page.
   */
  ngOnInit(): void {
    this.setMetaTags();
  }

  /**
   * Sets the meta tags for the page.
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
    this.titleService.setTitle(metaTags.bodyMassIndexCalculator.title);

    // Add meta tags
    this.meta.addTags([
      {
        name: "description",
        content: metaTags.bodyMassIndexCalculator.description
      },
      { name: "keywords", content: metaTags.bodyMassIndexCalculator.keywords },
      { name: "robots", content: metaTags.bodyMassIndexCalculator.robots },
      { name: "viewport", content: metaTags.bodyMassIndexCalculator.viewport }
    ]);
  }
}
