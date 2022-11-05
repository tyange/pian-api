import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Burger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string;
}
