import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop({ require: true })
    email: string;

    @Prop({ require: true })
    password: string;

    @Prop()
    age: string;

    @Prop()
    gender: string;

    @Prop()
    address: string;

    @Prop({type: Object})
    company: {
        _id:Types.ObjectId
        name: string
    };

    @Prop()
    role: string;

    @Prop()
    refreshToken: string;

    @Prop({ type: Object })
    createdBy: {
        _id: Types.ObjectId
        email: string
    };

    @Prop({ type: Object })
    updatedBy: {
        _id: Types.ObjectId
        email: string
    };

    @Prop({ type: Object })
    deletedBy: {
        _id: Types.ObjectId
        email: string
    };

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

    @Prop()
    isDeleted: boolean;

    @Prop()
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);