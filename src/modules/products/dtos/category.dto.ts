import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CategoryDTO {
    id: number;
    name: string;
}

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
