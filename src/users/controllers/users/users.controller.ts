import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/users/user.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServices: UsersService) { }
    @Get('/list')
    getAll():Promise<User[]>{
        return this.userServices.getAll()
    }
    @Post('/create')
    create(@Body() {firstName}: {firstName: string}):Promise<User>{
        return this.userServices.createUser(firstName)
    }
    @Get('/:id')
    getById(@Param('id') id: number): Promise<User> {
        return this.userServices.getOneById(id)
    }
    @Put('/:id')
    updateById(@Param() id: number,@Body() {firstName}: {firstName: string} ){
        return this.userServices.updateUser(id, firstName)
    }
    @Delete('/:id')
    deleteById(@Param() id: number) {
        return this.userServices.deleteUser(id)
    }
} 
