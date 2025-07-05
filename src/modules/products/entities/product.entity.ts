import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Brand } from 'src/modules/products/entities/brand.entity';
import { Category } from 'src/modules/products/entities/category.entity';
import { AppConstants } from 'src/common/constants/app.constants';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({ name: 'products'})
@Index(['price', 'stock'])
export class Product extends AuditBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.PRODUCT.NAME, unique: true })
    name: string;

    @Column({ type:'text'})
    description: string;

    @Column({type: 'float'})
    price: number;

    @Column({type: 'int'})
    stock: number;

    @Column({type: 'varchar'})
    image: string;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinColumn({ name: 'brand_id'})
    brand: Brand;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'jt_pro_cat',
        joinColumn: {
            name: 'product_id'
        },
        inverseJoinColumn: {
            name: 'category_id'
        }
    })
    categories: Category[];
}
