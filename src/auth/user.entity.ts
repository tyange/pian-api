import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Burger } from '../burger/burger.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  type: 'USER' | 'ADMIN';

  @OneToMany(() => Burger, (burger) => burger.user, { eager: true })
  burger: Burger[];
}
