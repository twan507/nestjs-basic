import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateSubscriberDto {

    @IsNotEmpty({ message: "Pasword không được để trống" })
    name: string

    @IsNotEmpty({ message: "Age không được để trống" })
    @IsEmail({ message: "email chưa đúng định dạng" })
    email: string

    @IsNotEmpty({ message: "skills không được để trống" })
    @IsArray({ message: "skills phải ở dạng array" })
    @IsString({ each: true, message: "mỗi Skill phải ở dạng string" })
    skills: string

}
