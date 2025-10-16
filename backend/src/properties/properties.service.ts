import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

@Injectable()
export class PropertiesService {
  create(draftProperty: Prisma.PropertyCreateInput) {
    return prisma.property.create({ data: draftProperty });
  }

  findAll() {
    return `This action returns all properties`;
  }

  async checkDraft(id: string) {
    return await prisma.property.findFirst({ where: { agentId: id, status: "DRAFT" } });
  }

  createPropertyLocation(location: Prisma.PropertyLocationCreateInput) {
    return prisma.propertyLocation.create({ data: location });
  }

  createPropertyFinancial(financialData: Prisma.PropertyFinancialCreateInput) {
    return prisma.propertyFinancial.create({ data: financialData })
  }

  createPropertyImage(imageData: Prisma.PropertyImageUncheckedCreateInput) {
    return prisma.propertyImage.create({ data: imageData })
  }

  updateBasicInfo(id: string, basicInfo: Prisma.PropertyUpdateInput) {
    return prisma.property.update({ where: { id }, data: basicInfo });
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
