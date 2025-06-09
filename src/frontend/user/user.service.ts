import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import UserEntity from 'src/entities/user.entity';
import UpdatePhoneUserDto from './dto/UpdatePhoneUser.dto';
import * as bcrypt from 'bcrypt';
import UpdatePasswordUserDto from './dto/UpdatePassword.dto';
import UpdateEmailDto from './dto/UpdateEmail.dto';
import RegisterDto from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private usertRepository: Repository<UserEntity>;

  async findOneByUsername(username: string) {
    return this.usertRepository.findOne({
      where: { username },
    });
  }

  async findById(id: number) {
    return await this.usertRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateInfo(id: number, updateUser: any) {
    await this.usertRepository.update(id, updateUser);
    return await this.findById(id);
  }

  async updateEmail(id: number, updateEmail: UpdateEmailDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkEmail = await this.usertRepository.findOne({
      where: {
        email: updateEmail.email,
        id: Not(id),
      },
    });

    if (checkEmail) {
      throw new HttpException(
        `Email ${updateEmail.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    user.email = updateEmail.email;
    await this.usertRepository.update(id, user);

    return await this.findById(id);
  }
  async updatePassword(id: number, updatePassword: UpdatePasswordUserDto) {
    const user = await this.findById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await bcrypt.compare(
      updatePassword.password,
      user.password,
    );
    if (!isMatch) {
      throw new HttpException(
        'Current password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(updatePassword.password, 10);
    user.password = hashedPassword;
    await this.usertRepository.update(id, user);

    return await this.findById(id);
  }

  async updatePhone(id: number, updatePhone: UpdatePhoneUserDto) {
    const user = await this.findById(id);
    const checkPhone = await this.usertRepository.findOne({
      where: {
        phone: updatePhone.phone,
        id: Not(id),
      },
    });

    if (checkPhone) {
      throw new HttpException(
        'Phone number already exists ${updatePhone.phone}',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    user.phone = updatePhone.phone;
    await this.usertRepository.update(id, user);
    return await this.findById(id);
  }

  async register(userRegister: RegisterDto) {
    const newData = await this.usertRepository.create(userRegister);
    return await this.usertRepository.save(newData);
  }

  // async updateRefreshToken(user_id: number, refresh_token: string) {
  //   const hashedRefreshToken = crypto
  //     .createHash('sha256')
  //     .update(refresh_token)
  //     .digest('hex');
  //   await this.userRepository.update(user_id, {
  //     refreshToken: hashedRefreshToken,
  //   });
  // }

  async saveRefreshToken(refreshToken: string, id: number) {
    const user = await this.findById(id);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refresh_token = hashedRefreshToken;
    return this.usertRepository.save(user);
  }

  async verifyRefreshToken(refresh_token: string, id: number) {
    const user = await this.usertRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      const status = await bcrypt.compare(refresh_token, user.refresh_token);
      if (status) {
        return user;
      }
    }
    return false;
  }

  async findByEmail(email: string) {
    return await this.usertRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.usertRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async findByPhone(phone: string) {
    return await this.usertRepository.findOne({
      where: {
        phone: phone,
      },
    });
  }
}
