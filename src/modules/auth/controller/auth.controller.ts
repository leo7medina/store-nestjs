import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { User } from 'src/modules/users/entities/user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        return this.authService.generateJWT(req.user as User);
    }
}
