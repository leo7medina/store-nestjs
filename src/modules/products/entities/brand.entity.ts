import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/modules/products/entities/product.entity';
import { AppConstants } from 'src/common/constants/app.constants';
import { AuditBaseEntity } from 'src/common/audit/audit-base.entity';

@Entity({name: 'brands'})
export class Brand extends AuditBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: AppConstants.MAX_LENGTH.BRAND.NAME, unique: true})
    name: string;

    @Column({type: 'varchar', length: AppConstants.MAX_LENGTH.BRAND.IMAGE})
    image: string;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
