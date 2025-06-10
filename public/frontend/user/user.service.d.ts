import UserEntity from 'src/entities/user.entity';
import UpdatePhoneUserDto from './dto/UpdatePhoneUser.dto';
import UpdatePasswordUserDto from './dto/UpdatePassword.dto';
import UpdateEmailDto from './dto/UpdateEmail.dto';
import RegisterDto from 'src/auth/dto/register.dto';
export declare class UserService {
    private usertRepository;
    findOneByUsername(username: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
    updateInfo(id: number, updateUser: any): Promise<UserEntity>;
    updateEmail(id: number, updateEmail: UpdateEmailDto): Promise<UserEntity>;
    updatePassword(id: number, updatePassword: UpdatePasswordUserDto): Promise<UserEntity>;
    updatePhone(id: number, updatePhone: UpdatePhoneUserDto): Promise<UserEntity>;
    register(userRegister: RegisterDto): Promise<UserEntity>;
    saveRefreshToken(refreshToken: string, id: number): Promise<UserEntity>;
    verifyRefreshToken(refresh_token: string, id: number): Promise<false | UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity>;
    findByPhone(phone: string): Promise<UserEntity>;
}
