import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from 'src/modules/users/enums/role.enum';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { AppConstants } from 'src/common/constants/app.constants';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.USER.EMAIL, unique: true })
    email: string;

    @Column({type: 'varchar', length: AppConstants.MAX_LENGTH.USER.USERNAME, unique: true})
    username: string;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.USER.PASSWORD })
    password: string; //encript

    @Column({
        type: 'enum',
        enum: RoleEnum
    })
    role: RoleEnum;

    @OneToOne(() => Customer,(customer) => customer.user, { nullable: true})
    @JoinColumn() // solo debe ir de un lado (relacion 1 - 1)
    customer: Customer;
}
