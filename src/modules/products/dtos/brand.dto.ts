import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AppConstants } from 'src/common/constants/app.constants';

export class BrandDTO {
    readonly id: number;
    readonly name: string;
}

export class CreateBrandDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(AppConstants.MAX_LENGTH.BRAND.NAME)
    readonly name: string;

    @IsUrl()
    @IsNotEmpty()
    @MaxLength(AppConstants.MAX_LENGTH.BRAND.IMAGE)
    @ApiProperty()
    readonly image: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
