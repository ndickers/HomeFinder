import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Res, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { GoogleAuthGuard } from './strategies/google-guard.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get("google/agent")
  @UseGuards(new GoogleAuthGuard("agent"))
  googleAgentLogin() {
  }

  @Get("google/tenant")
  @UseGuards(new GoogleAuthGuard("tenant"))
  googleTenantLogin() {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    const state = req?.query?.state as string
    const decoded = JSON.parse(Buffer.from(state, 'base64').toString()) as { role: string }
    const user = req.user

    //check if user exist, provide access token
    console.log("My google callback");


    return ({ google: "call back" })
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
