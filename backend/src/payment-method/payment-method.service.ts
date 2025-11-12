import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();
@Injectable()
export class PaymentMethodService {
  create(data: Prisma.PaymentMethodCreateInput) {
    return prisma.paymentMethod.create({ data })
  }

  findAll() {
    return prisma.paymentMethod.findMany();
  }

  findOne(name: string) {
    return prisma.paymentMethod.findFirst({
      where: {
        name
      }
    })
  }

  update(id: string, data: Prisma.PaymentMethodUpdateInput) {
    return prisma.paymentMethod.update({
      where: { id }, data
    })
  }

  remove(id: string) {
    return prisma.paymentMethod.delete({ where: { id } });
  }
}
