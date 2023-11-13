import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IUser, IUserResponse } from '../../interfaces/IUser.interface';
import { UsersApiResponse } from './dto/UsersApiResponse';

@Injectable()
export class UsersService {

  private readonly BASE_URL: string = process.env.BASE_URL;

  constructor() {}

  public async getUsers(): Promise<IUser[]> {
    const response = await axios.get<IUserResponse[]>(`${this.BASE_URL}/users`);

    const users: IUser[] = response.data
      .map((user: IUserResponse) => new UsersApiResponse(user))
      .sort((a, b) => b.id - a.id);

    return users;
  }

  public async sendPairUsers(users: IUser[]) {
    const usersPair: IUser[] = users.filter((user: IUser) => user.id % 2 == 0);
  }


}
