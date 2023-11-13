import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IUser, IUserResponse } from '../../interfaces/IUser.interface';
import { UsersApiResponse } from './dtos/UsersApiResponse';

@Injectable()
export class UsersService {

  private BASE_URL: string;

  constructor(private configService: ConfigService) {
    this.BASE_URL = this.configService.get<string>('BASE_URL');
  }

  public async getUsers(): Promise<IUser[]> {

    const response = await axios.get<IUserResponse[]>(`${this.BASE_URL}/users`);

    const users: IUser[] = response.data
                            .map((user: IUserResponse) => new UsersApiResponse(user))
                            .sort((a, b) => b.id - a.id);

    return users;

  }
}
