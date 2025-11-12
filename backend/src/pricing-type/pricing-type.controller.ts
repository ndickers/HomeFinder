import { Controller, Get, Post, Body, Param, Delete, InternalServerErrorException, ConflictException, NotFoundException, Put, BadRequestException } from '@nestjs/common';
import { PricingTypeService } from './pricing-type.service';
import { Prisma } from 'generated/prisma';


@Controller('pricing-type')
export class PricingTypeController {
  constructor(private readonly pricingTypeService: PricingTypeService) { }

  @Post()
  async create(@Body() data: Prisma.PricingTypeCreateInput) {
    try {
      const findType = await this.pricingTypeService.findOne(data.name);

      if (findType) {
        throw new ConflictException("Price type already exists");
      } else {
        const response = await this.pricingTypeService.create(data)
        if (!response) {
          throw new NotFoundException(`Failed to create price type`);
        }
        return { message: "Price type created!" };
      }

    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create price type',
        );
      }
    }
  }


  @Get()
  findAll() {
    return this.pricingTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingTypeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PricingTypeUpdateInput) {
    try {
      if (data.name) {
        const findType = await this.pricingTypeService.findOne(data.name as string);
        if (findType) {
          throw new ConflictException("Price type already exists");
        }
      }
      await this.pricingTypeService.update(id, data);
      return { message: "Price type updated!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update price type');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.pricingTypeService.remove(id);
      return { message: "Price type deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete price type');
    }
  }
}
