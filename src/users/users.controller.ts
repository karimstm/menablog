import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '@app/users/users.service';
import { CreateUserDto } from '@app/users/dto/CreateUser.dto';
import { IUserResponse } from '@app/users/types/userResponse.interface';
import { LoginDto } from '@app/users/dto/login.dto';
import { Response, Request } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/user.guards';
import { UpdateUserDto } from './dto/Update.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.transformUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body('user') loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.usersService.login(loginDto);
    return res
      .status(HttpStatus.OK)
      .send(this.usersService.transformUserResponse(user));
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: any): Promise<IUserResponse> {
    return this.usersService.transformUserResponse(user);
  }

  @Put('/user')
  @UseGuards(AuthGuard)
  async updateUser(
    @Body('user') updateUserDto: UpdateUserDto,
    @User('id') userId: any,
  ): Promise<IUserResponse> {
    const updatedUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    );
    return this.usersService.transformUserResponse(updatedUser);
  }
}
