import { IsMongoId, IsNotEmpty } from "class-validator"

export class CreateResumeDto {

    @IsNotEmpty({message: "email không được để trống"})
    email: string

    @IsNotEmpty({message: "userId không được để trống"})
    userId: string

    @IsNotEmpty({message: "URL không được để trống"})
    url: string

    @IsNotEmpty({message: "status không được để trống"})
    status: string

    @IsNotEmpty({message: "companyId không được để trống"})
    @IsMongoId({message: "companyId phải là MongoId"})
    companyId: string

    @IsNotEmpty({message: "jobId không được để trống"})
    @IsMongoId({message: "jobId phải là MongoId"})
    jobId: string
}

export class CreateUserCvDto {

    @IsNotEmpty({message: "URL không được để trống"})
    url: string

    @IsNotEmpty({message: "companyId không được để trống"})
    @IsMongoId({message: "companyId phải là MongoId"})
    companyId: string

    @IsNotEmpty({message: "jobId không được để trống"})
    @IsMongoId({message: "jobId phải là MongoId"})
    jobId: string
}

