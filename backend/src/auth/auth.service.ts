import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, $Enums } from 'generated/prisma';


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

  async verifyUser(userId: string, tokenId: string) {
    const result = await prisma.$transaction(async (tx) => {
      const updateUser = await tx.user.update({ where: { id: userId }, data: { status: "VERIFIED" } })
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
            email: true
          }
        }
      }
    })
  }

  async updateUserPass(tokenId: string, userId: string, password: string) {
    const result = await prisma.$transaction(async (tx) => {
      const updateUser = await tx.user.update({ where: { id: userId }, data: { password } })
      await tx.userVerification.update({ where: { id: tokenId }, data: { isUsed: true } })
      return updateUser
    })
    return result
  }

  findUser(email: string) {
    return prisma.user.findUnique({
      where: {
        email
      }
    })
  }

  async deleteExistingVerificationToken(userId: string, type: $Enums.VerificationType) {
    return await prisma.userVerification.deleteMany({ where: { userId, type } })
  }


  createNewToken(newTokenDetails: Prisma.UserVerificationUncheckedCreateInput) {
    return prisma.userVerification.create({ data: newTokenDetails })
  }
}
