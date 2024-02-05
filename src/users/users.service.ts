import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/core/services/prisma.service';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async addNewUser(createUserDto: CreateUserDto): Promise<User> {
    // run checking data
    await this.checkUniqueData(createUserDto.email, createUserDto.phoneNumber);

    const newUser = await this.prisma.user.create({
      data: {
        displayName: createUserDto.email,
      },
    });

    const newAuthUser = await this.prisma.auth.create({
      data: {
        email: createUserDto.email,
        password: await hash(createUserDto.password, 8),
        userId: newUser.id,
      },
    });

    return {
      id: newUser.id,
      email: newAuthUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      displayName: newUser.displayName,
      birthdate: newUser.birthdate,
      deliveryAddress: newUser.deliveryAddress,
      phoneNumber: newUser.phoneNumber,
      profileImage: newUser.profileImage,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString(),
    };
  }

  async checkUniqueData(
    email: CreateUserDto['email'],
    phoneNumber: CreateUserDto['phoneNumber'],
  ) {
    const existingEmail = await this.prisma.auth.findFirst({
      where: { email: email },
    });

    const existingPhoneNumber = await this.prisma.user.findFirst({
      where: {
        phoneNumber: phoneNumber,
      },
    });

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
