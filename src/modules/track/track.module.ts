import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStore } from './store/track-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackService', useClass: InMemoryTrackStore },
    ValidateUUIDPipe,
  ],
})
export class TrackModule {}
