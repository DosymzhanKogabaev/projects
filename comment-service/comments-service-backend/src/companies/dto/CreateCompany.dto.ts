import { IsNotEmpty, IsString } from "class-validator"

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsString()
    companyName: string

    @IsNotEmpty()
    @IsString()
    password: string
}