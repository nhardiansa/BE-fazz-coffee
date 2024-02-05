import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phone_number: string;
}
