import { IsNotEmpty, IsString } from 'class-validator';

class UpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}

export default UpdateEmailDto;
