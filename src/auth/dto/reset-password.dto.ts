import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Please provide email' })
  @IsEmail({}, { message: 'Email invalid' })
  email: string;

  @IsNotEmpty({ message: 'Please provide token to reset password' })
  token: string;

  @IsNotEmpty({ message: 'Please provide new password' })
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
    message: 'Password must be contains number and letter',
  })
  newPassword: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/, {
    message: 'Confirm password must be contains number and letter',
  })
  @IsNotEmpty({ message: 'Please provide confirm new password' })
  confirmNewPassword: string;
}
