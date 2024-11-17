import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FavsEntity } from '../../favs/entities/favs.entity';

@Entity('artist')
export class ArtistEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.id)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];

  @ManyToMany(() => FavsEntity, (favorite) => favorite.artists)
  favs: FavsEntity[];
}
