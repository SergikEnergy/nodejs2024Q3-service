import { ApiProperty } from '@nestjs/swagger';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';
import { FavsEntity } from '../../favs/entities/favs.entity';

@Entity('album')
export class AlbumEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
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

  @OneToMany(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity;

  @ManyToMany(() => FavsEntity, (favorite) => favorite.albums)
  favs: FavsEntity[];
}
