import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BaseResponse, SuccessResponse } from 'src/core/response/base-response';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginEntity } from './entities/login.entity';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { RequestVerifyResetDto } from './dto/verify-reset.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<SuccessResponse<UserEntity>> {
    const user = await this.authService.register(registerDto);
    return {
      success: true,
      message: 'Register success, please log in on the login page',
      result: user,
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<SuccessResponse<LoginEntity>> {
    const result = await this.authService.login(loginDto);
    return {
      success: true,
      message: 'Login success',
      result: result,
    };
  }

  @Post('refresh-access-token')
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<SuccessResponse<LoginEntity>> {
    const result = await this.authService.renewAccessToken(
      refreshAccessTokenDto.refreshToken,
    );

    return {
      success: true,
      message: 'Generate new access token success',
      result,
    };
  }

  @Post('request-verify-reset')
  async requestVerifyReset(
    @Body() requestVerifyResetDto: RequestVerifyResetDto,
  ): Promise<BaseResponse> {
    const message = await this.authService.requestVerifyResetPassword(
      requestVerifyResetDto,
    );
    return {
      success: true,
      message,
    };
  }

  @Post('verify-account')
  @HttpCode(HttpStatus.OK)
  async verifyAccount(
    @Body() verifyAccountDto: VerifyAccountDto,
  ): Promise<BaseResponse> {
    const message = await this.authService.verifyAccount(verifyAccountDto);

    return {
      success: true,
      message,
    };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<BaseResponse> {
    const message = await this.authService.resetPassword(resetPasswordDto);

    return {
      success: true,
      message,
    };
  }
}
