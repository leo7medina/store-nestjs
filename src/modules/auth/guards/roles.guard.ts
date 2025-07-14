import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'src/modules/users/enums/role.enum';
import { AppConstants } from 'src/common/constants/app.constants';
import { PayloadToken } from 'src/modules/auth/models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<RoleEnum[]>(
            AppConstants.ROLES_KEY,
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user as PayloadToken;
        const isAuth = roles.some((role) => Object.values(RoleEnum).includes(role));
        if (!isAuth) {
            throw new ForbiddenException('Your role is wrong');
        }
        return isAuth;
    }
}
