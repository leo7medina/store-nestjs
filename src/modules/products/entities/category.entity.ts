import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { AppConstants } from 'src/common/constants/app.constants';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({ name: 'categories'})
export class Category extends AuditBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: AppConstants.MAX_LENGTH.CATEGORY.NAME, unique: true})
    name: string;

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[];
}
