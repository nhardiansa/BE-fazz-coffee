import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, Matches } from 'class-validator';

export enum DeliveryMethod {
  DELIVERY = 'DELIVERY',
  DINE_IN = 'DINE IN',
  TAKE_AWAY = 'TAKE AWAY',
}
export class CreateProductDto {
  @IsNotEmpty({ message: 'name must be filled' })
  name: string;

  @IsNotEmpty({ message: 'price must be filled' })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsNotEmpty({ message: 'description must be filled' })
  description: string;

  @IsNotEmpty({ message: 'delivery method must be filled' })
  @IsEnum(DeliveryMethod)
  delivery_method: string;

  @IsNotEmpty({ message: 'start of delivery hour available must be filled' })
  @Matches(/^[0-2]\d:[0-5]\d$/, {
    message: 'start of delivery hour must use format HH:mm',
  })
  delivery_hour_available_start: string;

  @IsNotEmpty({ message: 'end delivery hour available must be filled' })
  @Matches(/^[0-2]\d:[0-5]\d$/, {
    message: 'start of delivery hour must use format HH:mm',
  })
  delivery_hour_available_end: string;

  @IsNotEmpty({ message: 'stock must be filled' })
  stock: number;

  @IsNotEmpty({ message: 'id of product size must be filled' })
  @Type(() => Number)
  @IsNumber()
  product_size_id: number;
}
