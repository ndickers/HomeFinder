import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from 'generated/prisma';


const prisma = new PrismaClient()

@Injectable()
export class AuthService {
  createGUser(newUser: Prisma.UserCreateInput) {
    return prisma.user.create({ data: newUser });
  }

  async create(newUser: Prisma.UserCreateInput, veriDetail: Prisma.UserVerificationCreateInput) {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: newUser })
      const verification = await tx.userVerification.create({ data: { ...veriDetail, user: { connect: { id: user.id } } } })
      return { user, verification }
    })
    return result
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

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
