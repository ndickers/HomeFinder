import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();
@Injectable()
export class PropertyTypeService {
  create(newType: Prisma.PropertyTypeCreateInput) {
    return prisma.propertyType.create({ data: newType })
  }

  findAll() {
    return prisma.propertyType.findMany();
  }

  findOne(name: string) {
    return prisma.propertyType.findFirst({ where: { name } })
  }

  update(id: string, data: Prisma.PropertyTypeUpdateInput) {
    return prisma.propertyType.update({
      where: {
        id
      }, data
    })
  }

  remove(id: string) {
    return prisma.propertyType.delete({
      where: {
        id
      }
    })
  }
}
