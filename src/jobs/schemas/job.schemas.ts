import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
    @Prop()
    name: string;

    @Prop()
    skills: string[];

    @Prop({ type: Object })
    company: {
        _id: Types.ObjectId
        name: string
        logo: string
    };

    @Prop()
    salary: number;

    @Prop()
    quantity: number;

    @Prop()
    level: string;

    @Prop()
    description: string;

    @Prop()
    location: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    isActive: boolean;

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

export const JobSchema = SchemaFactory.createForClass(Job);