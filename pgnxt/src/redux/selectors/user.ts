import { UserInfoDto } from '../../api/types/UserInfoDto';

export const getUser = (state: any): UserInfoDto => state.user;
