import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';


const prisma = new PrismaClient()

@Injectable()
export class AmenitiesService {
  create(data: Prisma.AmenityCreateInput) {
    return prisma.amenity.create({ data })
  }

  findAll() {
    return prisma.amenity.findMany()
  }

  update(id: string, data: Prisma.AmenityUpdateInput) {
    return prisma.amenity.update({
      where: {
        id
      }, data
    })
  }

  remove(id: string) {
    return prisma.amenity.delete({ where: { id } })
  }
}
