export class Settings {
  _id: string;
  description: string = '';
  links: Link[] = [];
  mailList: MailItem[] = [];
}
export class Link {
  link: string = '';
  name: string = '';
  active: boolean;
  constructor() {
    this.active = true;
  }
}
export class MailItem {
  mail: string = '';
  name: string = '';
}
