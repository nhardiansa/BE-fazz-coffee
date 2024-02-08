import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { RegisterDto } from 'src/auth/dto/register.dto';

export class CreateUserDto extends RegisterDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  displayName?: string;

  @IsString()
  birthdate?: string;

  @IsString()
  deliveryAddress?: string;

  @IsString()
  @IsPhoneNumber('ID')
  phoneNumber: string;
}
