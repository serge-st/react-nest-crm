import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserRole } from '../entities/userRole.entity';
import { CreateUserDto } from './create-user.dto';

export class SuccessUpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password', 'roleId'] as const)) {
    roleId: UserRole
}
