import { UsersEntity } from '@app/users/users.entity';
import { Request } from 'express';

export interface ExpressRequest extends Request {
  user?: UsersEntity;
}
