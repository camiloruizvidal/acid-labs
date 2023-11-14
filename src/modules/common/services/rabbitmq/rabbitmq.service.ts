import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import * as retry from 'retry';

@Injectable()
export class RabbitmqService {

    public async sendData(exchange: string, queue: string, data: any): Promise<void> {
        try {
            const connection = await amqp.connect();
            const channel = await connection.createChannel();

            await channel.assertExchange(exchange, 'fanout', { durable: false });
            await channel.assertQueue(queue, { durable: false });
            await channel.bindQueue(queue, exchange, '');

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

            setTimeout(() => {
                connection.close();
            }, 500);

        } catch(error) {
            console.log(error);
        }
    }
}
