import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './strategies/google-guard.guard';
import { $Enums, Prisma } from 'generated/prisma';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
        const createUser = await this.authService.create(newUser)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
