import { Controller, Get, Post, Body, Param, Delete, ConflictException, NotFoundException, InternalServerErrorException, Put, BadRequestException } from '@nestjs/common';
import { PropertyTypeService } from './property-type.service';
import { Prisma } from 'generated/prisma';

@Controller('property-type')
export class PropertyTypeController {
  constructor(private readonly propertyTypeService: PropertyTypeService) { }

  @Post()
  async create(@Body() newPropType: Prisma.PropertyTypeCreateInput) {
    try {
      const findType = await this.propertyTypeService.findOne(newPropType.name);
      if (findType) {
        throw new ConflictException("Property type already exist!");
      } else {
        const response = await this.propertyTypeService.create(newPropType)
        if (!response) {
          throw new NotFoundException(`Failed to create propety type`);
        }
        return { message: "Property type created!" };
      }
    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create property type',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.propertyTypeService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PropertyTypeUncheckedUpdateInput) {
    try {
      if (data.name) {
        const findType = await this.propertyTypeService.findOne(data.name as string);
        if (findType) {
          throw new ConflictException("Property type is already used");
        }
      }
      await this.propertyTypeService.update(id, data);
      return { message: "Property type updated!" }

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update property type');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.propertyTypeService.remove(id);
      return { message: "Property type deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete property type');
    }
  }
}
