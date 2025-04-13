import { PartialType } from '@nestjs/mapped-types';
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
} from 'class-validator';

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
    readonly image: string;
}

// export class UpdateProductDTO {
//     @IsString()
//     @IsNotEmpty()
//     readonly name?: string;
//     @IsString()
//     @IsNotEmpty()
//     readonly description?: string;
//     @IsNumber()
//     @IsPositive()
//     readonly price?: number;
//     @IsNumber()
//     @IsPositive()
//     readonly stock?: number;
//     @IsString()
//     @IsUrl()
//     readonly image?: string;
// }

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
