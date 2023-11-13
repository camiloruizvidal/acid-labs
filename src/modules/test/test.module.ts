import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { TestController } from './controllers/test/test.controller';

@Module({
    imports: [],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [TestController],
})
export class TestModule {}
