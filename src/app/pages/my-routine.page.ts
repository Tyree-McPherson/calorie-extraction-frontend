import { Component } from '@angular/core';
import { MyRoutinePageComponent }
from '../components/my-routine-page/my-routine-page.component';
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
    selector: 'app-my-routine',
    standalone: true,
    imports: [MyRoutinePageComponent],
    template: `<app-my-routine-page />`
})
export default class MyRoutineComponent {
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
    this.titleService.setTitle(metaTags.myRoutine.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.myRoutine.description },
      { name: "keywords", content: metaTags.myRoutine.keywords },
      { name: "robots", content: metaTags.myRoutine.robots },
      { name: "viewport", content: metaTags.myRoutine.viewport }
    ]);
  }
}
