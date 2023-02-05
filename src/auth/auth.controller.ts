import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/auth/models/user.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiCreatedResponse({ description: 'user login' })
  @ApiBody({ type: LoginDTO })
  login(@Body(ValidationPipe) login: LoginDTO) {
    return this.authService.login(login);
  }

  @Post('/register')
  @ApiCreatedResponse({ description: 'user registeration' })
  @ApiBody({ type: RegisterDTO })
  register(@Body(ValidationPipe) register: RegisterDTO) {
    return this.authService.register(register);
  }
}
