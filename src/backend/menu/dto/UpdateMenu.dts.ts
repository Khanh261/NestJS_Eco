import { IsNotEmpty, IsString } from 'class-validator';

class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  pro_name: string;
  pro_slug: string;
  pro_price: number;
  pro_category_id: number;
}

export default UpdateMenuDto;
