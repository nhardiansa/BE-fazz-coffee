import { PrismaService } from 'src/core/services/prisma.service';
import { RegisterDto } from '../dto/register.dto';
import { hash } from 'bcrypt';

export class AuthModel {
  model: PrismaService['auth'];

  constructor() {
    const prismaService = new PrismaService();
    this.model = prismaService.auth;
  }

  async checkEmailIsExisting(email: string) {
    await this.model.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.model.findFirst({ where: { email } });
  }

  async insertNewAuth(registerData: RegisterDto) {
    return await this.model.create({
      data: {
        email: registerData.email,
        password: await hash(registerData.password, 8),
      },
    });
  }
}
