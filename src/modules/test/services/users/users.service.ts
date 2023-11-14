import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IUser, IUserResponse } from '../../interfaces/IUser.interface';
import { UsersApiResponse } from './dto/UsersApiResponse';
import * as amqp from 'amqplib';




@Injectable()
export class UsersService {

  private readonly BASE_URL: string;
  private readonly AMQP_URL: string;

  constructor() {
    this.BASE_URL = process.env.BASE_URL
    this.AMQP_URL = `amqp://${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`;
  }

  public async getUsers(): Promise<IUser[]> {
    const response = await axios.get<IUserResponse[]>(`${this.BASE_URL}/users`);

    const users: IUser[] = response.data
      .map((user: IUserResponse) => new UsersApiResponse(user))
      .sort((a, b) => b.id - a.id);

    return users;
  }

  public async sendPairUsers(users: IUser[]) {
    const usersPair: IUser[] = users.filter((user: IUser) => user.id % 2 == 0);
    this.sendDataRabbitMQ(usersPair);
  }

  private async sendDataRabbitMQ(usersPair: IUser[]) {
    try {
      const connection = await amqp.connect(this.AMQP_URL);
      const channel = await connection.createChannel();

      await channel.assertExchange('users', 'fanout', { durable: false });
      await channel.assertQueue('users-requested', { durable: false });
      await channel.bindQueue('users-requested', 'users', '');

      channel.sendToQueue('users-requested', Buffer.from(JSON.stringify(usersPair)));

      setTimeout(() => {
        connection.close();
      }, 500);

      console.log({success: true})
    } catch(error) {
      console.log({error})
    }

  }


}
