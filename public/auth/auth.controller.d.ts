import { AuthService } from './auth.service';
import { ResponseData } from 'src/common/response/ResponseData';
import RegisterDto from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<ResponseData>;
    getProfile(req: any): Promise<import("../entities/user.entity").default>;
    register(registationData: RegisterDto): Promise<ResponseData>;
    refreshToken({ refresh_token }: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        user: any;
        expires_in: import("moment").Moment;
    }>;
}
