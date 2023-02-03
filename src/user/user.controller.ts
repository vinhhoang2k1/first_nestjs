import { Body, Controller, Get, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDTO } from 'src/auth/models/user.dto';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
    ) {}

    @Get('/')
    @UseGuards(AuthGuard())
    findCurrentUser(@User() {email}: UserEntity) {
        return this.userService.findUserByEmail(email)
    }
    @Put('/')
    @UseGuards(AuthGuard())
    update(@User() {email}: UserEntity, @Body(ValidationPipe) data: UpdateUserDTO) {
        return this.userService.updateUser(email, data)
    }
}
