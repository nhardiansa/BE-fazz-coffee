import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LoginEntity } from './entities/login.entity';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { AuthModel } from './models/auth.model';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken as RefreshTokenModel } from './models/refresh-token.model';
import { RequestVerifyResetDto } from './dto/verify-reset.dto';
import { UsersModel } from 'src/users/users.model';
import { VerifyResetToken } from './models/verify-refresh-token.model';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

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

    const authUser = await authModel.findFirst({
      where: { email: loginData.email },
    });

    if (!authUser) {
      throw new HttpException(
        'Email or password invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const authenticated = await compare(loginData.password, authUser.password);

    if (!authenticated) {
      throw new HttpException(
        'Email or password invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const accessToken = await this.createAccessToken(authUser.userId);
    const refreshToken = await this.createRefreshToken(authUser.userId);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  async createAccessToken(userId: number): Promise<string> {
    const expiresIn = process.env.NODE_ENV === 'PRODUCTION' ? '15m' : '30s';
    return this.jwtService.sign({ userId: userId }, { expiresIn });
  }

  async createRefreshToken(userId: number): Promise<string> {
    const refreshTokenModel = new RefreshTokenModel();

    // delete refresh old refresh token if exist
    const oldRefreshToken = await refreshTokenModel.model.findFirst({
      where: { userId },
    });

    if (oldRefreshToken) {
      await refreshTokenModel.model.delete({
        where: { id: oldRefreshToken.id },
      });
    }

    // Get the current date
    const currentDate = new Date();

    const expiresIn = process.env.NODE_ENV === 'PRODUCTION' ? '7d' : '5m';

    const generatedRefreshToken = this.jwtService.sign(
      { userId: userId },
      { expiresIn: expiresIn },
    );

    // Add 7 days to the current date for production
    const devFutureTime = new Date(currentDate);
    devFutureTime.setMinutes(currentDate.getMinutes() + 5);

    // Add 7 days to the current date for production
    const prodFutureTime = new Date(currentDate);
    prodFutureTime.setDate(currentDate.getDate() + 7);

    const expiresAt =
      process.env.NODE_ENV === 'PRODUCTION' ? prodFutureTime : devFutureTime;

    const result = await refreshTokenModel.model.create({
      data: {
        refreshToken: generatedRefreshToken,
        expiresAt: expiresAt,
        userId,
      },
    });

    return result.refreshToken;
  }

  async renewAccessToken(refreshToken: string): Promise<LoginEntity> {
    const refreshTokenModel = new RefreshTokenModel();

    const userId = this.jwtService.decode(refreshToken).userId;

    // Get the current date
    const currentDate = new Date();

    // check if refresh token exist
    const oldRefreshToken = await refreshTokenModel.model.findFirst({
      where: { userId },
    });

    if (!oldRefreshToken) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    // check if refresh token not expired

    if (currentDate > new Date(oldRefreshToken.expiresAt)) {
      throw new HttpException(
        'Aww, your session has expired. Please log in again for continued access',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // delete old token if there no more exception and generate new
    await refreshTokenModel.model.delete({ where: { id: oldRefreshToken.id } });

    return {
      access: await this.createAccessToken(userId),
      refresh: await this.createRefreshToken(userId),
    };
  }

  async requestVerifyResetPassword(
    requestVerifyResetDto: RequestVerifyResetDto,
  ): Promise<boolean> {
    const { email: emailData, requestType } = requestVerifyResetDto;
    const authModel = new AuthModel();
    const usersModel = new UsersModel();
    const verifyResetTokenModel = new VerifyResetToken();

    // get email and user if it exist
    const email = await authModel.checkEmailIsExisting(emailData);
    const user = await usersModel.findUserByEmail(email);

    // set expiration time for token
    const currentTime = new Date();
    const expirationTime = new Date();
    expirationTime.setMinutes(currentTime.getMinutes() + 1);

    const tokenType = requestType === 'reset_password' ? 'RESET' : 'VERIFY';

    // delete same type token from user
    const oldToken = await verifyResetTokenModel.model.findFirst({
      where: {
        tokenType,
        userId: user.id,
      },
    });

    console.log(currentTime, oldToken.expiredAt);

    // check if token not expired yet not delete it but wait until expired to generate again
    if (currentTime < new Date(oldToken.expiredAt)) {
      throw new HttpException(
        'We have already sent the code to your email. Please check it first or wait for one more minute to resend.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // delete if old token exist
    if (oldToken) {
      await verifyResetTokenModel.model.delete({ where: { id: oldToken.id } });
    }

    // set request to VerifyResetTokenModel
    const token = await verifyResetTokenModel.model.create({
      data: {
        expiredAt: expirationTime,
        token: Math.floor(Math.random() * 1000000).toString(),
        tokenType: tokenType,
        userId: user.id,
      },
    });

    console.log(token);

    return true;
  }
}
