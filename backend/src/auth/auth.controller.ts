import { Controller, Get, Post, Body, UseGuards, Req, Query, Res, ConflictException, InternalServerErrorException, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './strategies/google-guard.guard';
import { $Enums, Prisma } from 'generated/prisma';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { SentMessageInfo } from 'nodemailer';
import * as jwt from "jsonwebtoken";
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
    const user = req.user as Prisma.UserCreateInput & { accessToken: string }
    user.role = decoded.role

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accessToken: token, ...newUser } = user
    const accessToken = jwt.sign({ email: user.email, role: user.role, id: user.id }, process.env.SECRET as string)

    try {
      const doesUserExist = await this.authService.findUser(user?.email);
      if (doesUserExist) {
        return { accessToken, user: newUser }
      } else {
        if (decoded.role === "TENANT" && user) {
          user.status = "VERIFIED" as $Enums.UserStatus;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createUser = await this.authService.createGUser(newUser)
        if (createUser) {
          return { accessToken, user: newUser }
        }
      }
    } catch (error) {
      if (error) {
        throw error
      }
    }
  }

  @Post('signin')
  async signin(@Body() credential: { password: string, email: string }) {
    const { email, password: pass } = credential;
    try {
      const doesUserExist = await this.authService.findUser(email);
      if (!doesUserExist) {
        throw new NotFoundException("User not found");
      }
      const compare = await bcrypt.compare(pass, doesUserExist.password as string);
      if (!compare) {
        throw new UnauthorizedException("Invalid email or password");
      }
      const accessToken = jwt.sign({ email, role: doesUserExist.role, id: doesUserExist.id }, process.env.SECRET as string)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, createdAt, updatedAt, ...user } = doesUserExist
      return ({ accessToken, user });
    } catch (error) {
      throw new InternalServerErrorException(error)
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
        const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.API_URL}/auth/verify-email?token=${verification.token}`, "Confirm Registration", createdUser.email);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (sendMail?.accepted?.length > 0) {
          return {
            statusCode: 201,
            message: 'User registered successfully. Check your email to verify.',
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

  // GET: verify email
  @Get("verify-email")
  async verifyEmail(@Query("token") token: string, @Res() res: Response) {
    const getToken = await this.authService.getToken(token);
    if (!getToken) {
      throw new BadRequestException("Invalid or missing verification token.")
    }
    if (getToken.isUsed) {
      throw new BadRequestException("This verification link has already been used.")
    }
    if (getToken.expiresAt < new Date()) {
      throw new BadRequestException("This verification link has expired. Please request a new one.")
    }
    const userVerified = await this.authService.verifyUser(getToken.userId, getToken.id)
    if (userVerified) {
      res.redirect(`${process.env.CLIENT_URL}/verification/success`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/verification/failed`);
    }
  }
  // POST: resend verification
  @Post('resend-verification')
  async resendLink(@Body() mail: { email: string }) {
    const { email } = mail;
    try {
      const doesUserExist = await this.authService.findUser(email);
      if (!doesUserExist) {
        throw new NotFoundException("User not found")
      }
      if (doesUserExist.status === "VERIFIED") {
        throw new BadRequestException("Email is already verified")
      }
      ///delete any existing verification token
      await this.authService.deleteExistingVerificationToken(doesUserExist.id, "REGISTRATION")
      const token = uuidv4();
      const tokenDetails = { userId: doesUserExist.id, token, expiresAt: new Date(Date.now() + 1000 * 60 * 60), type: "REGISTRATION" }
      const addNewToken = await this.authService.createNewToken(tokenDetails as Prisma.UserVerificationUncheckedCreateInput)
      if (addNewToken) {
        const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.CLIENT_URL}/auth/verify-email?token=${addNewToken.token}`, "Resend Confirm Registration", email);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (sendMail?.accepted?.length > 0) {
          return {
            statusCode: 201,
            message: 'Registration link resend successfully. Check your email to verify',
          };
        } else {
          throw new InternalServerErrorException('Failed to resend verification email');
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('request-password-reset')
  async requestPassReset(@Body() mail: { email: string }) {
    const { email } = mail;
    try {
      const doesUserExist = await this.authService.findUser(email);
      if (!doesUserExist) {
        throw new NotFoundException("User not found")
      } else {
        await this.authService.deleteExistingVerificationToken(doesUserExist.id, "PASSWORD_RESET")
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

        const resetTokenDetail = { userId: doesUserExist.id, token, expiresAt, type: "PASSWORD_RESET" }

        console.log({ resetTokenDetail });
        const addNewToken = await this.authService.createNewToken(resetTokenDetail as Prisma.UserVerificationUncheckedCreateInput)

        if (addNewToken) {
          const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.CLIENT_URL}/reset-password?token=${addNewToken.token}`, "Reset Password", email);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (sendMail?.accepted?.length > 0) {
            return {
              statusCode: 201,
              message: 'Reset password link sent successfully. Check your email to reset',
            };
          } else {
            throw new InternalServerErrorException('Failed to send reset password link');
          }
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() credential: { password: string, token: string }) {
    const { password: pass, token } = credential;
    try {
      const getToken = await this.authService.getToken(token);
      console.log({ getToken });

      if (!getToken) {
        throw new BadRequestException("Invalid or missing verification token.")
      }
      if (getToken.isUsed) {
        throw new BadRequestException("This verification link has already been used.")
      }
      if (getToken.expiresAt < new Date()) {
        throw new BadRequestException("This verification link has expired. Please request a new one.")
      }
      const password = await bcrypt.hash(pass, 8);

      const passUpdated = await this.authService.updateUserPass(getToken.id, getToken.userId, password);

      if (passUpdated) {
        console.log({ passUpdated });

        return ({ message: "Password updated" })
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Post('resend-password-reset')
  async resendPassReset(@Body() mail: { email: string }) {
    const { email } = mail;
    try {
      const doesUserExist = await this.authService.findUser(email);
      if (!doesUserExist) {
        throw new NotFoundException("User not found")
      }
      ///delete any existing verification token
      await this.authService.deleteExistingVerificationToken(doesUserExist.id, "PASSWORD_RESET")
      const token = uuidv4();
      const tokenDetails = { userId: doesUserExist.id, token, expiresAt: new Date(Date.now() + 1000 * 60 * 60), type: "REGISTRATION" }
      const addNewToken = await this.authService.createNewToken(tokenDetails as Prisma.UserVerificationUncheckedCreateInput)
      if (addNewToken) {
        const sendMail: SentMessageInfo = await this.mailService.send(`${process.env.CLIENT_URL}/reset-password?token=${addNewToken.token}`, "Password Reset", email);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (sendMail?.accepted?.length > 0) {
          return {
            statusCode: 201,
            message: 'Password reset link resend successfully. Check your email to verify',
          };
        } else {
          throw new InternalServerErrorException('Failed to resend password reset link');
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
