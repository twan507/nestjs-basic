import { Transform, Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator"
import { Types } from "mongoose";

class Company {
    @IsNotEmpty()
    _id: Types.ObjectId

    @IsNotEmpty()
    name: string
}

export class CreateJobDto {

    @IsNotEmpty({ message: "Name không được để trống" })
    name: string;

    @IsNotEmpty({ message: "skills không được để trống" })
    @IsArray({ message: "skills định dạng là array" })
    @IsString({ each: true, message: "skill định dạng là string" })
    skills: string[];

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company

    @IsNotEmpty({ message: "Salary không được để trống" })
    salary: number;

    @IsNotEmpty({ message: "Quantity không được để trống" })
    quantity: number;

    @IsNotEmpty({ message: "Level không được để trống" })
    level: string;

    @IsNotEmpty({ message: "Description không được để trống" })
    description: string;

    @IsNotEmpty({ message: "Location không được để trống" })
    location: string;

    @IsNotEmpty({ message: "Description không được để trống" })
    @Transform(({ value }) => new Date(value))
    @IsDate({message: 'startDate có định dạng là Date'})
    startDate: Date;

    @IsNotEmpty({ message: "Description không được để trống" })
    @Transform(({ value }) => new Date(value))
    @IsDate({message: 'endDate có định dạng là Date'})
    endDate: Date;

    @IsNotEmpty({ message: "isActive không được để trống" })
    isActive: boolean;
}