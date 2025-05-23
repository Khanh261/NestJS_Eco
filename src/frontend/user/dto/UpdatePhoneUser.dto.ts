import { IsNotEmpty, IsString } from 'class-validator';

class UpdatePhoneUserDto {
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export default UpdatePhoneUserDto;
