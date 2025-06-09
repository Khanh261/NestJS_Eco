import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  a_name: string;

  @IsString()
  @IsNotEmpty()
  a_slug: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  a_description?: string;

  @IsOptional()
  @IsString()
  a_content?: string;

  @IsOptional()
  @IsString()
  a_avatar?: string;

  @IsOptional()
  a_hot?: number;

  @IsOptional()
  a_active?: number;

  @IsOptional()
  a_view?: number;
}

export default CreateArticleDto;
