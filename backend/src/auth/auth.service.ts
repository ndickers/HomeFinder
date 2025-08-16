import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaClient, Prisma } from 'generated/prisma';


const prisma = new PrismaClient()

@Injectable()
export class AuthService {
  create(newUser: Prisma.UserCreateInput) {
    return prisma.user.create({ data: newUser })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findUser(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
