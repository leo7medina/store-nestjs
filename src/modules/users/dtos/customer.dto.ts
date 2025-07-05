import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { AppConstants } from 'src/common/constants/app.constants';

export class CustomerDTO {
    readonly id: number;
    readonly name: string;
    readonly lastName: string;
    readonly phone: string;
}

export class CreateCustomerDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(AppConstants.MAX_LENGTH.CUSTOMER.NAME)
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(AppConstants.MAX_LENGTH.CUSTOMER.LASTNAME)
    @ApiProperty()
    readonly lastName: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    @MaxLength(AppConstants.MAX_LENGTH.CUSTOMER.PHONE)
    @ApiProperty()
    readonly phone: string;
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
