import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SuccessResponse } from 'src/core/response/base-response';
import { ProductEntity } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<SuccessResponse<ProductEntity>> {
    const product = await this.productService.create(createProductDto);
    return {
      success: true,
      message: 'Success add product',
      result: product,
    };
  }

  @Get()
  async findAll(): Promise<SuccessResponse<string>> {
    const result = await this.productService.findAll();
    return {
      success: true,
      message: 'asdasdasd',
      result,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
