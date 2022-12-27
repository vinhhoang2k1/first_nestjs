import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/type';

@Controller('users')
export class UsersController {
    constructor(
        @Inject('USER_SERVICE')
        private readonly userServices: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUser() {
        return this.userServices.getUser()
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':username')
    getUserByUsername(@Param('username') username: string) {
        const user = this.userServices.getUserByUsername(username)
        if (user) return new SerializedUser(user)
        else throw new HttpException('user is not found', HttpStatus.BAD_REQUEST)
    }
} 
