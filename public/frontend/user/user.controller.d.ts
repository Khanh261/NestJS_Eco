import { UserService } from './user.service';
import { ResponseData } from 'src/common/response/ResponseData';
import UpdatePhoneUserDto from './dto/UpdatePhoneUser.dto';
import UpdateInfoUserDto from './dto/UpdateInfoUser.dto';
import UpdatePasswordDto from './dto/UpdatePassword.dto';
import UpdateEmailDto from './dto/UpdateEmail.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateInfo(req: any, updateUser: UpdateInfoUserDto): Promise<ResponseData>;
    updateEmail(req: any, updateEmail: UpdateEmailDto): Promise<ResponseData>;
    updatePassword(req: any, updatePassword: UpdatePasswordDto): Promise<ResponseData>;
    updatePhone(req: any, formData: UpdatePhoneUserDto): Promise<ResponseData>;
}
