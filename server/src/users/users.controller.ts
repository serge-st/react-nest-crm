import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, BadRequestException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto['password']) {
      throw new BadRequestException(`To change password use '/users/change-password/:id' endpoint`)
    } else if (updateUserDto['username'] || updateUserDto['id']) {
      throw new BadRequestException(`Changing Username or ID is not allowed`)
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/change-password/:id')
  updatePassword(@Param('id') id: string, @Body() updateUserPasswordDto: UpdateUserPasswordDto): Promise<User> {
    return this.usersService.updatePassword(+id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
