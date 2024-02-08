import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/services/core.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from './core/mailer/mailer.module';
@Module({
  imports: [
    CoreModule,
    AuthModule,
    AuthModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
