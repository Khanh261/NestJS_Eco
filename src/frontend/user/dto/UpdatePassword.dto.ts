import { IsNotEmpty, IsString } from 'class-validator';

class UpdatePasswordUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}

export default UpdatePasswordUserDto;
