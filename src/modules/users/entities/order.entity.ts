import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { Exclude, Expose } from 'class-transformer';
import { OrderItem } from 'src/modules/users/entities/order-item.entity';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({name: 'orders'})
export class Order extends AuditBaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @Exclude()
    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

    @Expose()
    get products() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .map((item) => ({
                    ...item.product,
                    quantity: item.quantity,
                    itemId: item.id,
                }));
        }
        return [];
    }

    @Expose()
    get total() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .reduce((total, item) => {
                    const totalItem = item.product.price * item.quantity;
                    return total + totalItem;
                }, 0);
        }
        return 0;
    }
}
