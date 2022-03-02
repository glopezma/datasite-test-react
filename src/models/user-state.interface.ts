import { User } from './user.interface';

export interface UserState {
  users: User[];
  isGettingUsers: boolean;
  error: any;
}
