import { Controller, Get, Post, Body, Param, Delete, NotFoundException, InternalServerErrorException, Put, BadRequestException } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { Prisma } from 'generated/prisma';


@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) { }

  @Post()
  async create(@Body() data: Prisma.AmenityCreateInput) {
    try {
      const response = await this.amenitiesService.create(data)
      if (!response) {
        throw new NotFoundException(`Failed to create amenity`);
      }
      return { message: "Amenity created successfully" };
    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create amenity',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.amenitiesService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAmenity: Prisma.AmenityUpdateInput) {
    try {
      await this.amenitiesService.update(id, updateAmenity);
      return { message: "Amenity updated!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update Amenity');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.amenitiesService.remove(id);
      return { message: "Amenity deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete Amenity');
    }
  }
}
