import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class BrandDTO {
    id: number;
    name: string;
}

export class CreateBrandDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

export class UpdateBrandDTO extends PartialType(CreateBrandDTO) {}
