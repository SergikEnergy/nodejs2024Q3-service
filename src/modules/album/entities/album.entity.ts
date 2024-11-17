import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';
import { IAlbum } from '../interfaces/album.interface';

@Entity('album')
export class AlbumEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @Column()
  @ApiProperty()
  year: number;

  @ApiProperty({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.albumId)
  tracks: TrackEntity[];

  getAlbums() {
    const { id, name, year, artistId } = this;
    return { id, name, year, artistId } as IAlbum;
  }
}
