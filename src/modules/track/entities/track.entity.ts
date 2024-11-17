import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('track')
export class TrackEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  artistId: string | null;

  @ApiProperty({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  albumId: string | null;

  @ApiProperty()
  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artists: ArtistEntity[];

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  albums: ArtistEntity[];
}
