import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}


    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }

    generateJWT(user: User) {
        const payload: PayloadToken = { role: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user
        };
    }
}
