import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Customer } from 'src/modules/users/entities/customer.entity';
import { Product } from 'src/modules/products/entities/product.entity';

@Schema()
export class Order extends Document {

    @Prop({ type: Date })
    date: Date;

    @Prop( {
        type: Types.ObjectId, ref: Customer.name, required: true
    })
    customer: Customer | Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
    products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
