import { PrismaService } from 'src/core/services/prisma.service';

export class RefreshToken {
  model: PrismaService['refreshToken'];

  constructor() {
    this.model = new PrismaService()['refreshToken'];
  }
}
