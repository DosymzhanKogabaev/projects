import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comment {
    @Prop({ required: true })
    authorId: string

    @Prop({ required: true })
    toId: string

    @Prop({ required: true })
    description: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)