import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUsersStore } from './store/users-store';
import { ValidateUUIDPipe } from '../../common/validation/validate-uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UsersService,
    { useClass: InMemoryUsersStore, provide: 'UserStore' },
    ValidateUUIDPipe,
  ],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UserModule {}
