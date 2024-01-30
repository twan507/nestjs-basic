import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Company } from 'src/companies/schemas/company.schemas';
import { Job } from 'src/jobs/schemas/job.schemas';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ timestamps: true })
export class Resume {
    @Prop()
    email: string;

    @Prop()
    userId: Types.ObjectId;

    @Prop()
    url: string;

    @Prop()
    status: string;

    @Prop({ type: Types.ObjectId, ref: Company.name})
    companyId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Job.name})
    jobId: Types.ObjectId;

    @Prop({ type: Types.Array })
    history: {
        status: string
        updatedAt: Date
        updatedBy: {
            _id: Types.ObjectId
            email: string
        }
    }[]

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

export const ResumeSchema = SchemaFactory.createForClass(Resume);