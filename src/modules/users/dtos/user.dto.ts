import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UserDTO {
    id: number;
    email: string;
    password: string;
    role: string;
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
    readonly password: string;

    @IsNotEmpty()
    readonly role: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
