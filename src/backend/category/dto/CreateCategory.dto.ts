import { IsNotEmpty, IsString } from 'class-validator';

class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  c_name: string;

  c_slug: string;
  c_avatar: string;
  c_banner: string;
  c_description: string;
  c_hot: number | 0;
  c_status: number;
}

export default CreateCategoryDto;
