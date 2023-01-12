import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from 'src/models/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body(ValidationPipe) login: LoginDTO) {
    return this.authService.login(login);
  }
  
  @Post('/register')
  register(@Body(ValidationPipe) register: RegisterDTO) {
   return this.authService.register(register) 
  }
}
