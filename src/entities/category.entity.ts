import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public c_name: string;
  @Column()
  public c_slug: string;
  @Column()
  public c_avatar: string;
  @Column()
  public c_banner: string;

  @Column()
  public c_description: string;
  @Column()
  public c_hot: number;
  @Column()
  public c_status: number;
}

export default Category;
