import { IsNotEmpty, IsString } from 'class-validator';

class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  pro_name: string;
  pro_slug: string;
  pro_price: number;
  pro_category_id: number;
  pro_description: string;
}

export default CreateMenuDto;
