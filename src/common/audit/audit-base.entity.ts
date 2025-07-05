import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
export abstract class AuditBaseEntity {
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updatedAt: Date;

    @Column({ name: 'created_by', type: 'varchar', nullable: true })
    createdBy: string;

    @Column({  name: 'updated_by', type: 'varchar', nullable: true })
    updatedBy: string;

    @Column({ type: 'boolean', default: true })
    status: boolean; // true = activo, false = inactivo

    @VersionColumn()
    version: number;
}
