import { Controller, Get, Post, Body, Param, Delete, Put, InternalServerErrorException, NotFoundException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Prisma } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }

  @Post("draft")
  async create(@Body() user: { userId: string }) {

    const agentId: string = user.userId;
    const existingDraft = await this.propertiesService.checkDraft(agentId);
    if (existingDraft) {
      return {
        message: "Finish creating property",
        id: existingDraft.id,
      };
    } else {
      const response = await this.propertiesService.create({
        agent: {
          connect: { id: agentId },
        },
        title: 'Untitled Property',
        description: '',
        type: '',
        size: 0,
        floor: '',
        roomsCount: 0,
        bedroomsCount: 0,
        bathroomsCount: 0,
        furnished: false,
        price: 0,
        currency: 'USD',
        status: 'DRAFT',
        address: '',
        city: '',
        postcode: '',
        country: '',
        amenities: [],
        services: [],
      });
      if (!response) {
        throw new InternalServerErrorException('Failed to create property draft');
      }
      if (response) {
        return { message: "Draft created", id: response.id }
      }
    }
  }


  @Put(':id/basic')
  async updateBasic(@Param('id') id: string, @Body() basicInfo: Prisma.PropertyUpdateInput) {
    try {
      const response = await this.propertiesService.updateBasicInfo(id, basicInfo);
      if (!response) {
        throw new NotFoundException(`Property not found`);
      }
      return { message: "Saved successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Property not found');
        }
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to save basic info',
      );
    }
  }

  @Post(':id/location')
  async updateLocation(@Param('id') id: string, @Body() locationInfo: Prisma.PropertyLocationCreateInput) {
    const newLocation = { ...locationInfo, propertyId: id }
    try {
      const response = await this.propertiesService.createPropertyLocation(newLocation);
      if (!response) {
        throw new NotFoundException(`Property not found`);
      }
      return { message: "Location saved successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Property not found');
        }
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to save location',
      );
    }
  }

  @Post(':id/financial')
  async updateFinancial(@Param('id') id: string, @Body() financialInfo: Prisma.PropertyFinancialCreateInput) {
    const newFinancial = { ...financialInfo, propertyId: id }
    try {
      const response = await this.propertiesService.createPropertyFinancial(newFinancial);
      if (!response) {
        throw new NotFoundException(`Property not found`);
      }
      return { message: "Financial saved successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Property not found');
        }
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to save financial detail',
      );
    }
  }


  @Post(':id/images')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "uploads/properties",
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    })
  }))
  async uploadFile(@Param('id') id: string, @Body() data: { isPrimary: string }, @UploadedFile() file: Express.Multer.File) {
    const newImage: Prisma.PropertyImageUncheckedCreateInput = {
      propertyId: id,
      isPrimary: data.isPrimary === "true",
      imageUrl: file.filename
    }
    try {
      const response = await this.propertiesService.createPropertyImage(newImage);
      if (!response) {
        throw new NotFoundException(`Property not found`);
      }
      return { message: "Image saved successfully" };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Property not found');
        }
      }
      throw new InternalServerErrorException(
        error instanceof Error ? error.message : 'Failed to save image',
      );
    }
  }


  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.propertiesService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
