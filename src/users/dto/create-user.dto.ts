import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsString()
  birthdate: string;

  @IsString()
  deliveryAddress: string;

  @IsString()
  @IsPhoneNumber('ID')
  phoneNumber: string;
}
