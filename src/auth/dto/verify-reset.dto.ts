import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

type RequestType = 'verify' | 'reset_password';

const RequestTypes: RequestType[] = ['reset_password', 'verify'];

export class RequestVerifyResetDto {
  @IsNotEmpty({ message: 'You must input your request type' })
  @IsEnum(RequestTypes, {
    message: 'You must choose between verify or reset password',
  })
  requestType: RequestType;

  @IsNotEmpty({ message: 'You must input your email' })
  @IsEmail(
    {},
    {
      message: 'Email invalid',
    },
  )
  email: string;
}
