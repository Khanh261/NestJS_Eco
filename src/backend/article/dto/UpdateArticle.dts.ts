import { IsNotEmpty, IsString } from 'class-validator';

class UpdateArticleDto {
  @IsString()
  @IsNotEmpty()
  a_name: string;
  a_slug: string;
  a_description: string;
  a_view: number;
  a_avatar: string;
  a_content: string;
  a_hot: number;
  a_active: number;
  a_menu_id: number;
}

export default UpdateArticleDto;
