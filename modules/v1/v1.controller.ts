import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { V1Service } from './v1.service';
import { CreateV1Dto } from './dto/create-v1.dto';
import { UpdateV1Dto } from './dto/update-v1.dto';
import { newGroupDto } from './dto/newgroup.dto';

@Controller('v1')
export class V1Controller {
  constructor(private readonly v1Service: V1Service) {}

  @Post()
  create(@Body() createV1Dto: CreateV1Dto) {
    return this.v1Service.create(createV1Dto);
  }

  @Get()
  findAll() {
    return this.v1Service.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateV1Dto: UpdateV1Dto) {
    return this.v1Service.update(+id, updateV1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.v1Service.remove(+id);
  }

  @Post('newgroup')
  generateNewGroup(@Body() newGroupDto: newGroupDto) {
    return this.v1Service.generateNewGroup(newGroupDto)
  }
}
