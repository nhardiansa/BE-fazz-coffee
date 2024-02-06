import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginEntity } from './entities/login.entity';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthModel } from './auth.model';

@Injectable()
export class AuthService {
  async register(registerData: RegisterDto): Promise<UserEntity> {
    const usersService = new UsersService();

    const newUser = await usersService.addNewUserAndAuth({
      email: registerData.email,
      password: registerData.password,
      phoneNumber: registerData.phoneNumber,
    });

    return newUser;
  }

  async login(loginData: LoginDto): Promise<LoginEntity> {
    const authModel = new AuthModel().model;

    const authUser = await authModel.findFirstOrThrow({
      where: { email: loginData.email },
    });

    const authenticated = await compare(loginData.password, authUser.password);

    if (!authenticated) {
      throw new HttpException(
        'Email or password invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      access: 'asdasdasd sudah login',
      refresh: 'asdasdasd',
    };
  }
}
