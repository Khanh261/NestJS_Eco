import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/frontend/user/user.service';
import RegisterDto from './dto/register.dto';
import * as moment from 'moment';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
        user: any;
        expires_in: moment.Moment;
    }>;
    showUser(id: number): Promise<import("../entities/user.entity").default>;
    create(userDto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: any;
        expires_in: moment.Moment;
    }>;
    verifyRefreshToken(refresh_token: string): Promise<false | import("../entities/user.entity").default>;
}
