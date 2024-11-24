import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favs')
export class FavsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ArtistEntity, (artist) => artist.favs, {
    cascade: true,
  })
  @JoinTable({
    name: 'favs_artists',
    joinColumn: { name: 'favsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'artistId', referencedColumnName: 'id' },
  })
  artists: ArtistEntity[];

  @ManyToMany(() => AlbumEntity, (album) => album.favs, {
    cascade: true,
  })
  @JoinTable({
    name: 'favs_albums',
    joinColumn: { name: 'favsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'albumId', referencedColumnName: 'id' },
  })
  albums: AlbumEntity[];

  @ManyToMany(() => TrackEntity, (track) => track.favs, {
    cascade: true,
  })
  @JoinTable({
    name: 'favs_tracks',
    joinColumn: { name: 'favsId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'trackId', referencedColumnName: 'id' },
  })
  tracks: TrackEntity[];
}
