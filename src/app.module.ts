import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
