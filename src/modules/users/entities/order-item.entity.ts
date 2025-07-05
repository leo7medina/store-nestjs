import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { Order } from 'src/modules/users/entities/order.entity';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({name: 'orderdetails'})
export class OrderItem extends AuditBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

}
