import { Component } from '@angular/core';
import { EquipmentPageComponent }
from "../components/equipment-page/equipment-page.component";
import { Meta, Title } from '@angular/platform-browser';
import metaTags from '../json/meta-tags.json';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [EquipmentPageComponent],
  template: '<app-equipment-page />',
})
export default class EquipmentComponent {
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
    this.titleService.setTitle(metaTags.equipment.title);

    // Add meta tags
    this.meta.addTags([
      { name: "description", content: metaTags.equipment.description },
      { name: "keywords", content: metaTags.equipment.keywords },
      { name: "robots", content: metaTags.equipment.robots },
      { name: "viewport", content: metaTags.equipment.viewport }
    ]);
  }
}
