import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  login: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int' })
  version: number;

  @Transform(({ value }) => new Date(value).getTime())
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  @Column({ type: 'timestamp' })
  updatedAt: Date;

  getUserInfo() {
    return this;
  }
}
