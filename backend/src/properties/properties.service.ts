import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from 'generated/prisma';
import axios from "axios";
const prisma = new PrismaClient();

@Injectable()
export class PropertiesService {
  create(draftProperty: Prisma.PropertyCreateInput) {
    return prisma.property.create({ data: draftProperty });
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

  async searchPropertyLocation(city: string, address: string) {
    const query = city ? `${address}, ${city}` : address;
    try {
      // Get coordinates using Nominatim (OpenStreetMap)
      const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: query,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!geoRes?.data?.length) {
        return { message: 'Location not found' };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const { lat, lon } = geoRes.data[0];

      //  Use Overpass API to find nearby transport + malls
      const overpassQuery = `
        [out:json];
        node(around:1000,${lat},${lon})["amenity"~"bus_station|train_station|mall"];
        out;
      `;
      const overpassRes = await axios.get('https://overpass-api.de/api/interpreter', {
        params: { data: overpassQuery },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
      const nearbyPlaces = overpassRes.data.elements.map((el: any) => el.tags?.name).filter(Boolean);

      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        latitude: parseFloat(lat),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        longitude: parseFloat(lon),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        nearbyTransport: nearbyPlaces.length ? nearbyPlaces : [],
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch location data');
    }
  }
}
