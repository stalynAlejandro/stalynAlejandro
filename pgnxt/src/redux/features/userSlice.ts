import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApiResponse } from '../../api/types/ApiResponse';
import { UserInfoDto } from '../../api/types/UserInfoDto';
import ApiUrls from '../../constants/apiUrls';
import { fetchServer } from '../../utils/fetchServer';

const initialState = {
  userDisplayedName: '',
} as UserInfoDto;

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const response = await fetchServer<ApiResponse<UserInfoDto>>(
      ApiUrls.userInfo,
    );
    return response.entity;
  } catch (err) {
    return false;
  }
});

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(
      fetchUser.fulfilled,
      (state, { payload }) => payload || initialState,
    );
  },
  initialState,
  name: 'user',
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoDto>) => action.payload,
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
