import { Controller, Get, Post, Body, Param, Delete, NotFoundException, InternalServerErrorException, ConflictException, Put, BadRequestException } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Prisma } from 'generated/prisma';


@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) { }

  @Post()
  async create(@Body() data: Prisma.CurrencyCreateInput) {
    try {
      const findCode = await this.currenciesService.findOne(data.code);

      if (findCode) {
        throw new ConflictException("Currency code is already used");
      } else {
        const response = await this.currenciesService.create(data)
        if (!response) {
          throw new NotFoundException(`Failed to create currency`);
        }
        return { message: "Currency created!" };
      }

    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create currency',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.currenciesService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCurrency: Prisma.CurrencyUpdateInput) {
    try {
      if (updateCurrency.code) {
        const findCode = await this.currenciesService.findOne(updateCurrency.code as string);
        if (findCode) {
          throw new ConflictException("Currency code is already used");
        }
      }
      await this.currenciesService.update(id, updateCurrency);
      return { message: "Currency updated!" }

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update currency');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.currenciesService.remove(id);
      return { message: "Currency deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete currency');
    }
  }
}
