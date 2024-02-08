import { IsNotEmpty, IsPhoneNumber, Matches, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

const INVALID_MESSAGE =
  'Invalid phone number. Please use a valid format, for example: +623456789';
export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
    message: 'Password must be contains number and letter',
  })
  password: string;

  @IsNotEmpty({ message: 'Phone number must be filled' })
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/, {
    message: INVALID_MESSAGE,
  })
  @IsPhoneNumber('ID', {
    message: INVALID_MESSAGE,
  })
  phoneNumber: string;
}
