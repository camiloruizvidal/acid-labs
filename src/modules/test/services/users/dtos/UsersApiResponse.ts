import { ICompany, IUser, IUserResponse } from "src/modules/test/interfaces/IUser.interface";

export class UsersApiResponse implements IUser {

  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: ICompany;


  constructor(response: IUserResponse) {
    this.id = response.id;
    this.name = response.name;
    this.email = response.email;
    this.phone = response.phone;
    this.website = response.website;
    this.company = response.company;
  }

}
