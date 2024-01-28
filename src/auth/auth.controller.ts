import { Controller, Post, UseGuards, Body, Res, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request } from 'express';
import { IUser } from 'src/users/users.interface';

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Public()
    @ResponseMessage("User login")
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    handleLogin(
        @Req() req,
        @Res({ passthrough: true }) response: Response
    ) {
        return this.authService.login(req.user, response);
    }

    @Public()
    @ResponseMessage("Register a new user")
    @Post('/register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }

    @ResponseMessage("Get user infomation")
    @Get('/account')
    handleGetAccount(@User() user: IUser) {
        return { user }
    }

    @Public()
    @ResponseMessage("Get user refresh token")
    @Get('/refresh')
    handleRefreshToken(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response
    ) {
        const refreshToken = request.cookies["refresh_token"]
        return this.authService.processNewToken(refreshToken, response)
    }

    @ResponseMessage("Logout User")
    @Post('/logout')
    handleLogout(
        @Req() request: Request,
        @User() user: IUser,
        @Res({ passthrough: true }) response: Response
    ) {
        const refreshToken = request.cookies["refresh_token"]
        return this.authService.logout(response, user, refreshToken)
    }
}
