import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from 'src/modules/auth/models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(config.KEY) configService: ConfigType<typeof config>,
    ) {
        // @ts-ignore
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtSecret,
        });
    }

    validate(payload: PayloadToken) {
        return payload
    }
}
