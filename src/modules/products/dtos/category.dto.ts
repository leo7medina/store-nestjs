import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CategoryDTO {
    id: number;
    name: string;
}

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
