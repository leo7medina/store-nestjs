import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber, IsOptional,
    IsPositive,
    IsString,
    IsUrl, MaxLength, Min, ValidateIf,
} from 'class-validator';
import { AppConstants } from 'src/common/constants/app.constants';

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
    @MaxLength(AppConstants.MAX_LENGTH.PRODUCT.NAME)
    @ApiProperty({ description: 'Name of the product'})
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly price: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    readonly stock: number;

    @IsString()
    @IsUrl()
    @ApiProperty()
    readonly image: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly brandId: number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly categoriesIds: number[];
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
    @IsPositive()
    minPrice: number;

    @ValidateIf( (item) => item.minPrice)
    @IsPositive()
    maxPrice: number;
}
