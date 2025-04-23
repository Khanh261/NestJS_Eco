import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
class Article {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public a_name: string;
  @Column()
  public a_slug: string;
  @Column()
  public a_description: string;
  @Column({ default: 0 })
  public a_view: number;
  @Column()
  public a_avatar: string;
  @Column()
  public a_content: string;
  @Column({ default: 1 })
  public a_hot: number;

  @Column({ default: 1 })
  public a_active: number;
  @Column({ default: 1 })
  public a_menu_id: number;
}

export default Article;
