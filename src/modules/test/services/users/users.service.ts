import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IUser, IUserResponse } from '../../interfaces/IUser.interface';
import { UsersApiResponse } from './dto/UsersApiResponse';
import * as amqp from 'amqplib';
import { RabbitmqService } from '../../../common/services/rabbitmq/rabbitmq.service';




@Injectable()
export class UsersService {

  private readonly BASE_URL: string;
  private readonly AMQP_URL: string;

  constructor(private readonly rabbitMQService: RabbitmqService) {
    this.BASE_URL = process.env.BASE_URL
    this.AMQP_URL = `amqp://${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`;
  }

  public async getUsers(): Promise<IUser[]> {
    const response = await axios.get<IUserResponse[]>(`${this.BASE_URL}/users`);

    const users: IUser[] = response.data
      .map((user: IUserResponse) => new UsersApiResponse(user))
      .sort((firstUser: IUserResponse, secondUser: IUserResponse) => secondUser.id - firstUser.id);

    return users;
  }

  public async sendPairUsers(users: IUser[]) {
    const usersPair: IUser[] = users.filter((user: IUser) => user.id % 2 == 0);
    await this.rabbitMQService.sendData('users', 'users-requested', usersPair);

  }

}
