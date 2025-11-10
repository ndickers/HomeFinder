import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Injectable()
export class CurrenciesService {
  create(data: Prisma.CurrencyCreateInput) {
    return prisma.currency.create({ data })
  }

  findAll() {
    return prisma.currency.findMany();
  }

  findOne(code: string) {
    return prisma.currency.findFirst({
      where: {
        code
      }
    })
  }
  update(id: string, data: Prisma.CurrencyUpdateInput) {
    return prisma.currency.update({
      where: { id }, data
    })
  }

  remove(id: string) {
    return prisma.currency.delete({ where: { id } })
  }
}
