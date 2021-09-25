import { UsersEntity } from '@app/users/users.entity';
import { JwtPayload } from 'jsonwebtoken';

export type UserType = Omit<UsersEntity, 'encryptPassword'>;

export type JwtPyloadType = { id: number; username: string } & JwtPayload;
