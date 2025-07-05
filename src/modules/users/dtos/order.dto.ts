import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class OrderDTO {
    readonly id: number;
    readonly customerId: number;
}

export class CreateOrderDTO {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    readonly customerId: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
