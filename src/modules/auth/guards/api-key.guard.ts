import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { AppConstants } from 'src/common/constants/app.constants';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const isPublic = this.reflector.get(AppConstants.IS_PUBLIC, context.getHandler());
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.header('Auth')
        const isAuth = authHeader === this.configService.apiKey;
        if (!isAuth) {
          throw new UnauthorizedException("not allow");
        }
        return isAuth;
    }
}
