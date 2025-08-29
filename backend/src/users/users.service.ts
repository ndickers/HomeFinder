import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, UserStatus } from 'generated/prisma';

const prisma = new PrismaClient();


@Injectable()
export class UsersService {

  async create(newUser: Prisma.UserCreateInput, veriDetail: Prisma.UserVerificationCreateInput) {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({ data: newUser })
      const verification = await tx.userVerification.create({ data: { ...veriDetail, user: { connect: { id: user.id } } } })
      return { user, verification }
    })
    return result
  }

  findAll() {
    return `This action returns all users`;
  }

  findUser(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async setNewUserPass(userId: string, tokenId: string, passUpdate: { status: UserStatus, password: string }) {
    const result = await prisma.$transaction(async (tx) => {
      const updateUser = await tx.user.update({ where: { id: userId }, data: passUpdate })
      await tx.userVerification.update({ where: { id: tokenId }, data: { isUsed: true } })
      return updateUser
    })
    return result
  }

  getToken(token: string) {
    return prisma.userVerification.findFirst({
      where: {
        token
      },
      include: {
        user: {
          select: {
            role: true,
          }
        }
      }
    })
  }

}
