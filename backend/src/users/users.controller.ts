import { Controller, Get, Post, Body, Param, Delete, UseGuards, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Prisma, UserStatus } from 'generated/prisma';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import bcrypt from "bcrypt";
import { SentMessageInfo } from 'nodemailer';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly mailService: MailService) { }
  @Post("invite")
  async create(@Body() newUser: Prisma.UserCreateInput) {
    try {
      const doesUserExist = await this.usersService.findUser(newUser.email)
      if (doesUserExist) {
        throw new ConflictException("User already exist")
      }
      const token = uuidv4();
      const userVerification = {
        token, expiresAt: new Date(Date.now() + 1000 * 60 * 60), type: "REGISTRATION"
      }
      const { user: createdUser, verification } = await this.usersService.create(newUser, userVerification as Prisma.UserVerificationCreateInput);
      ///send mail
      const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.CLIENT_URL}/auth/set-password?token=${verification.token}`, "Confirm Registration by setting your password", createdUser.email);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (sendMail?.accepted?.length > 0) {
        return {
          statusCode: 201,
          message: 'User created successful',
        };
      } else {
        throw new InternalServerErrorException('Failed to send verification email.');
      }
    }
    catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('registration-set-password')
  async setNewUserPassword(@Body() newPassDetails: { token: string, password: string }) {
    const { token, password } = newPassDetails;
    try {
      const getToken = await this.usersService.getToken(token);
      const pass = await bcrypt.hash(password, 8);
      const role = getToken?.user.role
      const passUpdate: { status: UserStatus, password: string } = { status: "PENDING", password: pass };
      if (role === "ADMIN" || role === "TENANT") {
        passUpdate.status = "VERIFIED"
      }
      const updatePassword = await this.usersService.setNewUserPass(getToken?.userId as string, getToken?.id as string, passUpdate)
      if (updatePassword) {
        console.log({ updatePassword });

        return { message: "Password set successful" }
      } else {
        throw new BadRequestException("Password set fail");
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
  // @UseGuards(RoleGuard(["ADMIN"]))
  @Get()
  findAll() {
    return "aLL RESORCE";
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return ""
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return "";
  }
}
