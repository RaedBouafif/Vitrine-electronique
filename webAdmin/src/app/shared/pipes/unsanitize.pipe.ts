import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'unsanitize'
})
export class UnsanitizePipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(html: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }
}
