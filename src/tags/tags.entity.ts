import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tags' })
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
