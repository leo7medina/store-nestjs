import { IsArray, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CustomerDTO {
    id: number;
    name: string;
    lastName: string;
    phone: string;
}

export class CreateCustomerDTO {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    readonly phone: string;

    @IsArray()
    @IsNotEmpty()
    readonly skills: any;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
