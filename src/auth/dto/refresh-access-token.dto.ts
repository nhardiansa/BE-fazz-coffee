import { IsNotEmpty } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsNotEmpty({ message: 'Enter valid refresh token' })
  refreshToken: string;
}
