import { Module } from '@nestjs/common';
import { UsersController } from '@app/users/users.controller';
import { UsersService } from '@app/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { AuthGuard } from '@app/users/guards/user.guards';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard],
  exports: [UsersService],
})
export class UsersModule {}
