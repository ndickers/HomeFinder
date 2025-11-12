import { Controller, Get, Post, Body, Put, Param, Delete, InternalServerErrorException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Prisma } from 'generated/prisma';


@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  async create(@Body() data: Prisma.ServiceCreateInput) {
    try {
      const findService = await this.servicesService.findOne(data.name);
      if (findService) {
        throw new ConflictException("Service already exist!");
      } else {
        const response = await this.servicesService.create(data);
        if (!response) {
          throw new NotFoundException(`Failed to create service`);
        }
        return { message: "Service created!" };
      }
    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create service',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.ServiceUpdateInput) {
    try {
      if (data.name) {
        const findService = await this.servicesService.findOne(data.name as string);
        if (findService) {
          throw new ConflictException("Service already exist!");
        }
      }
      await this.servicesService.update(id, data);
      return { message: "Service updated!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update service');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.servicesService.remove(id);
      return { message: "Service deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete service!');
    }

  }
}
