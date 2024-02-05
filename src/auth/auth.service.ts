import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/core/services/prisma.service';

@Injectable()
export class AuthService {
  async register(registerData: RegisterDto) {
    const usersService = new UsersService(new PrismaService());

    const newUser = await usersService.addNewUser({
      email: registerData.email,
      password: registerData.password,
      phoneNumber: registerData.phoneNumber,
    });

    console.log(newUser);

    return newUser;
  }
}
