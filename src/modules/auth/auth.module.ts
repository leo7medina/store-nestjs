import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/modules/auth/strategys/local.strategy';
import { AuthController } from 'src/modules/auth/controller/auth.controller';

@Module({
    imports: [
      UsersModule, PassportModule
    ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
