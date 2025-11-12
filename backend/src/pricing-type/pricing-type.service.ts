import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Injectable()
export class PricingTypeService {
  create(data: Prisma.PricingTypeCreateInput) {
    return prisma.pricingType.create({ data });
  }

  findAll() {
    return prisma.pricingType.findMany();
  }

  findOne(name: string) {
    return prisma.pricingType.findFirst({
      where: {
        name
      }
    })
  }

  update(id: string, data: Prisma.PricingTypeUpdateInput) {
    return prisma.pricingType.update({
      where: { id }, data
    })
  }

  remove(id: string) {
    return prisma.pricingType.delete({ where: { id } })
  }
}
