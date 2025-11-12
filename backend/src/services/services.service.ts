import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();
@Injectable()
export class ServicesService {
  create(data: Prisma.ServiceCreateInput) {
    return prisma.service.create({ data })
  }

  findAll() {
    return prisma.service.findMany();
  }

  findOne(name: string) {
    return prisma.service.findFirst({ where: { name } })
  }

  update(id: string, data: Prisma.ServiceUpdateInput) {
    return prisma.service.update({ where: { id }, data })
  }

  remove(id: string) {
    return prisma.service.delete({
      where: {
        id
      }
    })
  }
}
