import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SuccessResponse } from 'src/core/response/base-response';
import { UserEntity } from 'src/users/entities/user.entity';
import { LoginEntity } from './entities/login.entity';

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
}
