import { Controller, Get, Post, Body, Param, Delete, ConflictException, NotFoundException, InternalServerErrorException, Put, BadRequestException } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { Prisma } from 'generated/prisma';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) { }

  @Post()
  async create(@Body() data: Prisma.PaymentMethodCreateInput) {
    try {
      const findMethod = await this.paymentMethodService.findOne(data.name);

      if (findMethod) {
        throw new ConflictException("Payment method already exists!");
      } else {
        const response = await this.paymentMethodService.create(data)
        if (!response) {
          throw new NotFoundException(`Failed to create payment method!`);
        }
        return { message: "Payment method created!" };
      }

    } catch (error) {
      if (error) {
        throw new InternalServerErrorException(
          error instanceof Error ? error.message : 'Failed to create payment method!',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.PaymentMethodUpdateInput) {
    try {
      if (data.name) {
        const findCode = await this.paymentMethodService.findOne(data.name as string);
        if (findCode) {
          throw new ConflictException("Payment method already exist!");
        }
      }
      await this.paymentMethodService.update(id, data);
      return { message: "Payment method updated!" }

    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update payment method!');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.paymentMethodService.remove(id);
      return { message: "Payment method deleted!" }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete payment method');
    }
  }
}
