import { Component } from '@angular/core';
import { BreathingExercisesPageComponent } from
"../components/breathing-exercises-page/breathing-exercises-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-breathing-exercises',
  standalone: true,
  imports: [BreathingExercisesPageComponent],
  template: '<app-breathing-exercises-page />',
})
export default class BreathingExercisesComponent {
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
   * @private
   */
  setMetaTags() {
    // Set the title of the page
    this.titleService.setTitle(metaTags.breathingExercises.title);

    // Add meta tags
    this.meta.addTags([
      {
        name: "description",
        content: metaTags.breathingExercises.description
      },
      { name: "keywords", content: metaTags.breathingExercises.keywords },
      { name: "robots", content: metaTags.breathingExercises.robots },
      { name: "viewport", content: metaTags.breathingExercises.viewport }
    ]);
  }
}
