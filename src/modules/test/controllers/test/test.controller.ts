import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { IUser } from '../../interfaces/IUser.interface';

@Controller('test')
export class TestController {

  constructor(private usersService: UsersService) {}

  @Get('/users')
  public async getUsers(): Promise<IUser[]> {

    try {
      const users: IUser[] = await this.usersService.getUsers();
      await this.usersService.sendPairUsers(users);
      return users;
    } catch (error) {
      throw new HttpException('Error al obtener usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
