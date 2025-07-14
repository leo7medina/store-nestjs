import { SetMetadata } from '@nestjs/common';
import { AppConstants } from 'src/common/constants/app.constants';
import { RoleEnum } from 'src/modules/users/enums/role.enum';


export const Roles = (...roles: RoleEnum[]) => SetMetadata(AppConstants.ROLES_KEY, roles);
