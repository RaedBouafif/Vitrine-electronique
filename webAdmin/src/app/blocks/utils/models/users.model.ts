export class User {
  gender: string;
  name: string;
  email: string;
  phone: string;
  cell: string;
  age: number;
  nat: string;
  registered: string;
  location: Location;
  picture: Picture;
  status: string;
}

export interface Registered {
  date: string;
  age: number;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
