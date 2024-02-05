import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    // return this.authService.create(registerDto);
    console.log(registerDto);
    return 'register';
  }
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return 'login';
    // return this.authService.create(loginDto);
  }
}
