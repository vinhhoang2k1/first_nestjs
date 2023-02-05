import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from 'src/auth/models/user.dto';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { email }: UserEntity) {
    return this.userService.findUserByEmail(email);
  }
  @Put('/')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  update(
    @User() { email }: UserEntity,
    @Body(ValidationPipe) data: UpdateUserDTO,
  ) {
    return this.userService.updateUser(email, data);
  }
}
