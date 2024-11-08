import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUsersStore } from './store/users-store';

@Module({
  controllers: [UserController],
  providers: [UsersService, InMemoryUsersStore],
})
export class UserModule {}
