import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import faq from 'src/app/json/faq.json';

@Component({
  selector: 'app-faq-page',
  standalone: true,
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
  imports: [CommonModule, MatIconModule, MatDividerModule]
})
export class FaqPageComponent {

  questionsAndAnswers: any[] = faq;
  activeDropdownIndex: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * This lifecycle hook is used to set the index of the active
   * dropdown on page load. If the page is loaded with a fragment
   * in the URL, the corresponding dropdown will be opened.
   */
  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {

        const index = this.questionsAndAnswers
          .findIndex(qa => qa.question.replace(/\s+/g, '-')
          .toLowerCase() === fragment);

        if (index !== -1) this.activeDropdownIndex = index;
      };
    });
  }

  /**
   * Toggles the dropdown at a given index. If the index matches the currently
   * active index, the dropdown will be closed. Otherwise, the dropdown will be
   * opened and the URL fragment will be updated to match the new active
   * dropdown.
   *
   * @param index The index of the dropdown to toggle.
   */
  toggleDropdown(index: number): void {

    if (this.activeDropdownIndex === index) {

      this.activeDropdownIndex = null;
      this.router.navigate([], { fragment: undefined });

    } else {

      this.activeDropdownIndex = index;
      const fragment = this.questionsAndAnswers[index].question
        .replace(/\s+/g, '-').toLowerCase();
      this.router.navigate([], { fragment });
    };
  }

  /**
   * Returns true if the dropdown at the given index is currently active,
   * false otherwise.
   *
   * @param index The index of the dropdown to check.
   */
  isDropdownActive(index: number): boolean {
    return this.activeDropdownIndex === index;
  }
}