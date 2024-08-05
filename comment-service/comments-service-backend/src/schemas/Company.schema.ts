import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Company {
    @Prop({ required: true, unique: true })
    companyName: string

    @Prop({ required: true })
    password: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[]
}

export const CompanySchema = SchemaFactory.createForClass(Company)