import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @Column()
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  @Column()
  updatedAt: Date;

  getUserInfo() {
    return this;
  }
}
