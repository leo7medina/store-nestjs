import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber, IsOptional,
    IsPositive,
    IsString,
    IsUrl, Min, ValidateIf, ValidateNested,
} from 'class-validator';
import { CreateCategoryDTO } from 'src/modules/products/dtos/category.dto';
import { CreateSubDocDTO } from 'src/modules/products/dtos/sub-doc.dto';
import { Type } from 'class-transformer';

export class ProductDTO {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly image: string;
}
export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsNumber()
    @IsPositive()
    readonly price: number;
    @IsNumber()
    @IsPositive()
    readonly stock: number;
    @IsString()
    @IsUrl()
    readonly image: string;

    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty()
    readonly category: CreateCategoryDTO;

    @IsNotEmpty()
    @IsMongoId()
    readonly brand: string;

    @IsNotEmpty()
    @ValidateNested()
    readonly subDoc: CreateSubDocDTO;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSubDocDTO)
    readonly subDocs: CreateSubDocDTO[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}


export class FilterProductsDTO {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @Min(0)
    minPrice: number;

    @ValidateIf((params) => params.minPrice)
    @IsPositive()
    maxPrice: number;
}
