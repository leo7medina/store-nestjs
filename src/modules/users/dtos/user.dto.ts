import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, Length, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RoleEnum } from 'src/modules/users/enums/role.enum';
import { AppConstants } from 'src/common/constants/app.constants';

export class UserDTO {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly role: string;
}

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    @ApiProperty({
        description: 'Email address of the user',
        type: 'string',
    })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty()
    readonly password: string;

    @IsNotEmpty()
    @MaxLength(AppConstants.MAX_LENGTH.USER.USERNAME)
    @ApiProperty()
    readonly username: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(RoleEnum, { message: 'El rol debe ser: [CUSTOMER, ADMIN, PRODUCT_MANAGER, ORDER_MANAGER, SUPPORT, MARKETING, LOGISTICS]'})
    readonly role: RoleEnum;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    readonly customerId: number;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
