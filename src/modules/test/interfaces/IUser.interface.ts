export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IUserResponse extends IUser {
  address: IAddress;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}
