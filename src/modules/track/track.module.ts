import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryTrackStore } from './store/track-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    { provide: 'TrackStore', useClass: InMemoryTrackStore },
    ValidateUUIDPipe,
  ],
  exports: [TrackService],
  // imports: [forwardRef(() => FavsModule)],
})
export class TrackModule {}
