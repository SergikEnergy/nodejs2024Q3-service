import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { FavsEntity } from '../../favs/entities/favs.entity';

@Entity('track')
export class TrackEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ApiProperty({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty()
  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  album: AlbumEntity;

  @ManyToMany(() => FavsEntity, (favorite) => favorite.tracks)
  favs: FavsEntity[];
}
