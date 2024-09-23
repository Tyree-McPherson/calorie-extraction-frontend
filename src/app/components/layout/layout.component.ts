import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PageComponent } from "../page/page.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { ModalComponent } from "../modal/modal.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    PageComponent,
    MatGridListModule,
    ModalComponent,
    RouterOutlet
  ]
})

export class LayoutComponent {}
