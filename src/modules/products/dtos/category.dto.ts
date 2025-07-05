import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AppConstants } from 'src/common/constants/app.constants';

export class CategoryDTO {
    readonly id: number;
    readonly name: string;
}

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @MaxLength(AppConstants.MAX_LENGTH.CATEGORY.NAME)
    readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
