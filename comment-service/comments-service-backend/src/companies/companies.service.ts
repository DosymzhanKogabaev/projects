import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company } from "src/schemas/Company.schema";
import { CreateCompanyDto } from "./dto/CreateCompany.dto";
import { UpdateCompanyDto } from "./dto/UpdateCompany.dto";

@Injectable()
export class CompaniesService {
    constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}
    
    async createCompany(createCompanyDto: CreateCompanyDto) {
        if((await this.companyModel.findOne({ companyName: createCompanyDto.companyName })))
            throw new HttpException('Company already exist', 409);

        const newCompany = new this.companyModel(createCompanyDto)
        return newCompany.save()
    }

    getCompanies() {
        return this.companyModel.find().populate('comments')
    }

    getCompanyById(id: string) {
        return this.companyModel.findById(id)
    }

    updateCompany(id: string, updateCompanyDto: UpdateCompanyDto) {
        return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true })
    }

    deleteCompany(id: string) {
        return this.companyModel.findByIdAndDelete(id)
    }
 }