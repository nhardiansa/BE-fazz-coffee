import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersModel } from './users.model';
import { AuthModel } from 'src/auth/auth.model';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  async addNewUserAndAuth(createUserDto: CreateUserDto): Promise<UserEntity> {
    // run checking if email and phone number exist
    await this.checkUniqueData(createUserDto.email, createUserDto.phoneNumber);

    const userModel = new UsersModel();
    const authModel = new AuthModel();

    const newUser = await userModel.model.create({
      data: {
        displayName: createUserDto.email,
        phoneNumber: userModel.cleanPhoneNumber(createUserDto.phoneNumber),
      },
    });

    const authUser = await authModel.model.create({
      data: {
        email: createUserDto.email,
        password: await hash(createUserDto.password, 8),
        userId: newUser.id,
      },
    });

    return {
      ...newUser,
      email: authUser.email,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
    };
  }

  async checkUniqueData(
    email: CreateUserDto['email'],
    phoneNumber: CreateUserDto['phoneNumber'],
  ) {
    const userModel = new UsersModel();
    const authModel = new AuthModel();

    const existingEmail = await authModel.findByEmail(email);

    const existingPhoneNumber = await userModel.findByPhoneNumber(phoneNumber);

    if (existingPhoneNumber) {
      throw new HttpException(
        'Phone number already taken',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existingEmail) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }
  }
}
