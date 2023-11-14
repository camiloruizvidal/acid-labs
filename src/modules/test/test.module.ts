import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TestController } from './controllers/test/test.controller';
import { RabbitmqService } from '../common/services/rabbitmq/rabbitmq.service';


@Module({
    imports: [],
    providers: [UsersService, RabbitmqService],
    exports: [UsersService],
    controllers: [TestController],
})
export class TestModule {}
