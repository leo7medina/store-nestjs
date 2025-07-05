import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Order } from 'src/modules/users/entities/order.entity';
import { AppConstants } from 'src/common/constants/app.constants';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({ name: 'customers'})
export class Customer extends AuditBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.CUSTOMER.NAME })
    name: string;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.CUSTOMER.LASTNAME })
    lastName: string;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.CUSTOMER.PHONE })
    phone: string;

    @OneToOne(() => User, (user) => user.customer, { nullable: true})
    user: User;

    @OneToMany(()=> Order, (order) => order.customer)
    orders: Order[];
}
