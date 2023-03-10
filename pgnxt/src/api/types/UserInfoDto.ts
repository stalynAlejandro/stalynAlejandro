import userTypes from '../../enums/userTypes';

export interface UserInfoDto {
  country: string;
  mail: string;
  middleOffice?: string | null;
  office?: string | null;
  userDisplayedName: string;
  userId: string;
  userType: typeof userTypes[keyof typeof userTypes];
}
