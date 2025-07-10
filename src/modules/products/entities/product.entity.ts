import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/modules/products/entities/brand.entity';
import { SubDoc, SubDocSchema } from 'src/modules/products/entities/sub-doc.entity';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;
    @Prop()
    description: string;
    @Prop({ type: Number })
    price: number;
    @Prop({ type: Number })
    stock: number;
    @Prop()
    image: string;

    /**
     * Relación emebebida.
     */
    @Prop(raw({
        name: { type: String},
        image: { type: String},
    }))
    category: Record<string, any>;

    /**
     * Relación referenciada.
     */
    @Prop({ type: Types.ObjectId, ref: Brand.name})
    brand: Brand | Types.ObjectId;

    @Prop({ type: SubDocSchema })
    subDoc: SubDoc;

    @Prop({ type: [SubDocSchema] })
    subDocs: Types.Array<SubDoc>;
}


export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 }); // 1 => ascendente; -1 => descendente
