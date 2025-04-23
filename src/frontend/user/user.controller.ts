import {
  Controller,
  Put,
  UseGuards,
  Request,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseData } from 'src/common/response/ResponseData';
import UpdatePhoneUserDto from './dto/UpdatePhoneUser.dto';
import UpdateInfoUserDto from './dto/UpdateInfoUser.dto';
import UpdatePasswordDto from './dto/UpdatePassword.dto';
import UpdateEmailDto from './dto/UpdateEmail.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update-info')
  async updateInfo(@Request() req, @Body() updateUser: UpdateInfoUserDto) {
    const { id, user } = req.user;

    const data = await this.userService.updateInfo(id, updateUser);

    return new ResponseData(HttpStatus.OK, data, 'update user success');
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-email')
  async updateEmail(@Request() req, @Body() updateEmail: UpdateEmailDto) {
    const { id, user } = req.user;

    const data = await this.userService.updateEmail(id, updateEmail);

    return new ResponseData(HttpStatus.OK, data, 'update email success');
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-password')
  async updatePassword(
    @Request() req,
    @Body() updatePassword: UpdatePasswordDto,
  ) {
    const { id, user } = req.user;

    const data = await this.userService.updatePassword(id, updatePassword);

    return new ResponseData(HttpStatus.OK, data, 'update password success');
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-phone')
  async updatePhone(@Request() req, @Body() formData: UpdatePhoneUserDto) {
    const { id, user } = req.user;

    const data = await this.userService.updatePhone(id, formData);

    return new ResponseData(HttpStatus.OK, data, 'update user success');
  }
}
