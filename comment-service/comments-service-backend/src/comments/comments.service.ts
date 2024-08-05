import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "src/schemas/Comment.schema";
import { CreateCommentDto } from "./dto/CreateComment.dto";
import { UpdateCommentDto } from "./dto/UpdateComment.dto";
import { User } from "src/schemas/User.schema";
import { Company } from "src/schemas/Company.schema";

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>, 
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Company.name) private companyModel: Model<Company>
    ) {}
    
    async createComment(createCommentDto: CreateCommentDto) {
        const findAuthor = await this.userModel.findById(createCommentDto.authorId) || await this.companyModel.findById(createCommentDto.authorId)
        const findTo = await this.userModel.findById(createCommentDto.toId) || await this.companyModel.findById(createCommentDto.toId)
        if(!findAuthor) {
            throw new HttpException("Author not found", 404)
        }
        if(!findTo) {
            throw new HttpException("To not found", 404)
        }
        const newComment = new this.commentModel(createCommentDto)
        const savedComment = await newComment.save()
        await findTo.updateOne({ $push: {
            comments: savedComment._id
        }})
        return savedComment
    }

    getComments() {
        return this.commentModel.find()
    }

    getCommentById(id: string) {
        return this.commentModel.findById(id)
    }

    updateComment(id: string, updateCommentDto: UpdateCommentDto) {
        return this.commentModel.findByIdAndUpdate(id, updateCommentDto, { new: true })
    }

    deleteComment(id: string) {
        return this.commentModel.findByIdAndDelete(id)
    }
 }