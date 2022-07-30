import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlclean'
})
export class HtmlCleanPipe implements PipeTransform {
  transform(value: string): any {
    return value.replace(/<.*?>/g, ''); // replace tags
  }
}
