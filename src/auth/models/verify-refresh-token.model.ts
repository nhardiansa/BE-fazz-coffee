import { PrismaService } from 'src/core/services/prisma.service';

export class VerifyResetToken {
  model: PrismaService['verifyResetToken'];

  constructor() {
    this.model = new PrismaService()['verifyResetToken'];
  }
}
