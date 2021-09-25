import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/users/dto/CreateUser.dto';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { IUserResponse } from '@app/users/types/userResponse.interface';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByUserName = await this.userRepository.find({
      username: createUserDto.username,
    });

    if (userByEmail || userByUserName) {
      throw new HttpException(
        'Email or username already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = new UsersEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findById(id: number): Promise<UsersEntity> {
    const user = await this.userRepository.findOne({ id });
    return user;
  }

  async updateUser(id: number, updateUserDto): Promise<UsersEntity> {
    const user = await this.findById(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<UsersEntity> {
    let isTheSamePassword = false;
    const user = await this.userRepository.findOne(
      {
        email: loginDto.email,
      },
      { select: ['id', 'bio', 'email', 'image', 'username', 'password'] },
    );
    if (user)
      isTheSamePassword = await compare(loginDto.password, user.password);
    if (!user || !isTheSamePassword)
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    delete user.password;
    return user;
  }

  generateJwt(user: UsersEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
    );
  }

  transformUserResponse(user: UsersEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
