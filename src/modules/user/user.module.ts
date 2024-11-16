import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUsersStore } from './store/users-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    { useClass: InMemoryUsersStore, provide: 'UserStore' },
    ValidateUUIDPipe,
  ],
})
export class UserModule {}
