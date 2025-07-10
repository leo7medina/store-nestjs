import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {

    @IsNotEmpty()
    @IsMongoId()
    readonly customer: string;

    @IsDate()
    @IsNotEmpty()
    readonly date: Date;

    @IsArray()
    @IsNotEmpty()
    readonly products: string[];
}

export class UpdateOrderDTO extends PartialType(
    OmitType(CreateOrderDTO, ['products'])
) {}


export class AddProductsToOrderDTO {
    @IsArray()
    @IsNotEmpty()
    readonly productsIds: string[];
}
