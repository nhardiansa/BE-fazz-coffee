import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({
    message: 'Email must be filled',
  })
  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'Password must be filled' })
  password: string;
}
