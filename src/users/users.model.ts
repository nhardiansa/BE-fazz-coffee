import { PrismaService } from 'src/core/services/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { AuthModel } from 'src/auth/auth.model';

export class UsersModel {
  model: PrismaService['user'];

  constructor() {
    const prismaService = new PrismaService();
    this.model = prismaService.user;
  }

  async findUserByEmail(email: string) {
    const authModel = new AuthModel();
    const auth = await authModel.findByEmail(email);

    return await this.model.findFirst({
      where: {
        id: auth.id,
      },
    });
  }

  cleanPhoneNumber(phoneNumber: RegisterDto['phoneNumber']): string {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
    return cleanPhoneNumber;
  }

  async findByPhoneNumber(phoneNumber: string) {
    return await this.model.findFirst({
      where: {
        phoneNumber: this.cleanPhoneNumber(phoneNumber),
      },
    });
  }
}
