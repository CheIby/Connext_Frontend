import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUserInfo } from "../types/User";
import { UserApiCall } from "../services/User/user";
import { IAccessToken } from "../types/Token";
import jwtDecode from "jwt-decode";

interface UsersState{
  user : IUserInfo | null;
}

const initialState: UsersState = {
  user: null
};

export const fetchUserInfo = createAsyncThunk(
'user/fetchUserInfo',
  async (token: string) => {
    if (token != null) {
      try {
        const res = await UserApiCall.getUserInfo();
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { 
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.user;

export default userSlice.reducer;