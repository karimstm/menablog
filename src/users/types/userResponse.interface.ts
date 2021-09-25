import { UserType } from '@app/users/types/user.type';

export interface IUserResponse {
  user: UserType & {
    token: string;
  };
}
