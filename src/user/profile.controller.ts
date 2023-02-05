import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {}
  @Get('/:email')
  async findProfile(@Param('email') email: string) {
    const profile = await this.userService.findUserByEmail(email);
    if (!profile) {
      throw new NotFoundException();
    }
    return {
      profile,
    };
  }

  @Post('/:email/follow')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  async followUser(@User() user: UserEntity, @Param('email') email: string) {
    const profile = await this.userService.followUser(user, email);
    return {
      profile,
    };
  }

  @Delete('/:email/follow')
  @ApiBearerAuth('token')
  @UseGuards(AuthGuard())
  async unFollowUser(@User() user: UserEntity, @Param('email') email: string) {
    const profile = await this.userService.unFollowUser(user, email);
    return {
      profile,
    };
  }
}
