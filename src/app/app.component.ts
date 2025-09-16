import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/loader/loader.component';
import {
    TranslateService,
    TranslatePipe,
    TranslateDirective
} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private translate = inject(TranslateService);
   constructor() {
        this.translate.addLangs(['ar', 'en']);
        this.translate.setFallbackLang('en');
        this.translate.use('ar');
  }
  title = 'hotel';
}
