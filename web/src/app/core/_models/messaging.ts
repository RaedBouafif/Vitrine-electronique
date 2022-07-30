export class Message {
  _id: string;
  subject: string;
  body: string;
  recipient: string = "0";
  sendingDate: Date;
  sender: Sender = new Sender();
  read: boolean = false;
  reply: string;
}
export class Sender {
  name: string;
  address: string;
  city: string;
  PostalCode: string;
  mail: string;
  phoneNumber: String;
}
export class Mail {
  mail: string;
  subject: string;
  body: string;
  constructor(mail: string, subject: string, body: string) {
    this.mail = mail;
    this.subject = subject;
    this.body = body;
  }
}
