import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Res, Redirect, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './strategies/google-guard.guard';
import { $Enums, Prisma } from 'generated/prisma';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { SentMessageInfo } from 'nodemailer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly mailService: MailService) { }

  @Get("google/agent")
  @UseGuards(new GoogleAuthGuard("AGENT"))
  googleAgentLogin() {
  }

  @Get("google/tenant")
  @UseGuards(new GoogleAuthGuard("TENANT"))
  googleTenantLogin() {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    const state = req?.query?.state as string
    const decoded = JSON.parse(Buffer.from(state, 'base64').toString()) as { role: $Enums.Role }
    const user = req.user as Prisma.UserCreateInput & {
      accessToken?: string;
    };
    user.role = decoded.role

    try {
      const doesUserExist = await this.authService.findUser(user?.email)
      if (doesUserExist) {
        return user
      } else {
        if (decoded.role === "TENANT" && user) {
          user.status = "VERIFIED" as $Enums.UserStatus;
        }

        const { accessToken, ...newUser } = user;
        const createUser = await this.authService.createGUser(newUser)
        console.log({ accessToken });
        if (createUser) {
          return user
        }
      }
    } catch (error) {
      if (error) {
        throw error
      }
    }
  }


  @Post('signup')
  async createNewUser(@Body() user: Prisma.UserCreateInput) {
    try {
      const doesUserExist = await this.authService.findUser(user?.email);
      const token = uuidv4();
      if (doesUserExist) {
        throw new ConflictException("User already exist")
      } else {
        user.password = await bcrypt.hash(user.password as string, 8)
        const userVerification = {
          token, expiresAt: new Date(Date.now() + 1000 * 60 * 60), type: "REGISTRATION"
        }
        const { user: createdUser, verification } = await this.authService.create(user, userVerification as Prisma.UserVerificationCreateInput);

        ///send mail
        const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.CLIENT_URL}/verify?token=${verification.token}`, "Confirm Registration", createdUser.email);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (sendMail?.accepted?.length > 0) {
          return {
            statusCode: 201,
            message: 'Agent registered successfully. Check your email to verify.',
          };
        } else {
          throw new InternalServerErrorException('Failed to send verification email.');
        }
      }

    } catch (error) {
      if (error) {
        throw error
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
