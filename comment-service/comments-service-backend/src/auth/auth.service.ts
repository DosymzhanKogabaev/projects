import { Request, Injectable, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService : JwtService) {}
    
    async signIn(signInDto: SignInDto) {
        const user = await this.userModel.findOne({ username: signInDto.username });
        if (user?.password !== signInDto.password) {
            throw new HttpException("Wrong password", 401);
        }
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async getProfile(@Request() req) {
        return await this.userModel.findById(req.user.sub)
    }
}
