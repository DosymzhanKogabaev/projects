import { IsNotEmpty, IsString } from "class-validator"

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    authorId: string

    @IsNotEmpty()
    @IsString()
    toId: string

    @IsNotEmpty()
    @IsString()
    description: string
}