import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductModel } from './models/product.model';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const productModel = new ProductModel();

    // await productModel.self.create({data: {
    //   ProductDeliveryMethods: {
    //     create: {

    //     }
    //   }
    // }})

    console.log(createProductDto);

    return {
      id: 0,
      name: '',
      price: 0,
      description: '',
      image_url: '',
      delivery_hour: {
        start: '07:01',
        end: '07:02',
      },
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  async findAll(): Promise<string> {
    return Promise.resolve('asdasdasd');
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
