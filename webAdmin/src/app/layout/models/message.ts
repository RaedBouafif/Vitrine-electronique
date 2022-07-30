export class Message {
  time: string;
  message: string;
  from: From;
}

export interface From {
  name: string;
  email: string;
  status: string;
  picture: string;
}
