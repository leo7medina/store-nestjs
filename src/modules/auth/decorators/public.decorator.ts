import { SetMetadata } from '@nestjs/common';
import { AppConstants } from 'src/common/constants/app.constants';

export const Public = () => SetMetadata(AppConstants.IS_PUBLIC, true);
