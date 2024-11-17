import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '../../album/entities/album.entity';
import { TrackEntity } from '../../track/entities/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.artistId)
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artistId)
  tracks: TrackEntity[];
}
