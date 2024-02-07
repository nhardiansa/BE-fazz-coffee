import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyAccountDto {
  @IsNotEmpty({ message: 'Please provide token for verification' })
  token: string;

  @IsNotEmpty({ message: 'Please provide email for verification' })
  @IsEmail({}, { message: 'Email invalid' })
  email: string;
}
