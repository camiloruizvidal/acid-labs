import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';


@Injectable()
export class RabbitmqService {

    private readonly AMQP_URL: string;

    constructor() {
        this.AMQP_URL = 'amqp://'
                        + `${process.env.AMQP_USER}:${process.env.AMQP_PASS}@`
                        + `${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`;
    }

    public async sendData(exchange: string, queue: string, data: any): Promise<void> {

        try {

            const connection = await amqp.connect(this.AMQP_URL);
            const channel = await connection.createChannel();

            await channel.assertExchange(exchange, 'fanout', { durable: false });
            await channel.assertQueue(queue, { durable: false });
            await channel.bindQueue(queue, exchange, '');

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

            await channel.close();

        } catch(error) {
            throw error;
        }

    }
}
