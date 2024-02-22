import { PrismaService } from 'src/core/services/prisma.service';

export class ProductModel {
  self: PrismaService['products'];

  constructor() {
    const prismaService = new PrismaService();
    this.self = prismaService.products;
  }
}
