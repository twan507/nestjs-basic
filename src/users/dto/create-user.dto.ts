import { Type } from "class-transformer"
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator"
import { Types } from "mongoose"

class Company {
    @IsNotEmpty()
    _id: Types.ObjectId

    @IsNotEmpty()
    name:string
}

export class CreateUserDto {

    @IsNotEmpty({message: "Name không được để trống"})
    name: string

    @IsEmail({},{message: "Email không đúng định dạng"})
    @IsNotEmpty({message: "Email không được để trống"})
    email: string

    @IsNotEmpty({message: "Pasword không được để trống"})
    password: string

    @IsNotEmpty({message: "Age không được để trống"})
    age: string

    @IsNotEmpty({message: "Gender không được để trống"})
    gender: string

    @IsNotEmpty({message: "Address không được để trống"})
    address: string

    @IsNotEmpty({message: "Role không được để trống"})
    role: string

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(()=> Company)
    company: Company
}

export class RegisterUserDto {

    @IsNotEmpty({message: "Pasword không được để trống"})
    name: string

    @IsEmail({},{message: "Email không đúng định dạng"})
    @IsNotEmpty({message: "Email không được để trống"})
    email: string

    @IsNotEmpty({message: "Pasword không được để trống"})
    password: string

    @IsNotEmpty({message: "Pasword không được để trống"})
    age: string

    @IsNotEmpty({message: "Pasword không được để trống"})
    gender: string

    @IsNotEmpty({message: "Pasword không được để trống"})
    address: string
}
