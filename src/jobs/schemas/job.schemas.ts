import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
    @Prop()
    name: string;

    @Prop()
    skill: string;

    @Prop()
    location: string;

    @Prop()
    salary: string;

    @Prop()
    quantity: string;

    @Prop()
    level: string;

    @Prop()
    description: string;

    @Prop({type: Object})
    company: {
        _id:Types.ObjectId
        name: string
    };

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    isActive: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);