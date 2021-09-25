import { Module } from '@nestjs/common';
import { TagsController } from '@app/tags/tags.controller';
import { TagsService } from '@app/tags/tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
