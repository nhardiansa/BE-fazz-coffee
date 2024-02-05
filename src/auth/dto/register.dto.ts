import { IsNotEmpty, IsPhoneNumber, Matches, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
    message: 'Password must be contains number and letter',
  })
  password: string;

  @IsNotEmpty({ message: 'Phone number must be filled' })
  @IsPhoneNumber('ID', {
    message:
      'Invalid phone number. Please use a valid format, for example: +123456789',
  })
  phoneNumber: string;
}
