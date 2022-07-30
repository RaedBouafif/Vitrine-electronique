import { Component, OnInit } from '@angular/core';
import { I18nService } from '@app/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prx-button-language-selector',
  templateUrl: './button-language-selector.component.html',
  styleUrls: ['./button-language-selector.component.scss']
})
export class ButtonLanguageSelectorComponent implements OnInit {
  chevronDown = faChevronDown;

  constructor(private i18nService: I18nService) {}

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }
}
