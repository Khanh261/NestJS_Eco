import { IsNotEmpty, IsString } from 'class-validator';

class UpdateInfoUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export default UpdateInfoUserDto;
