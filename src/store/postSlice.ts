import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IPostInfo } from "../types/Post";
import { PostApiCall } from "../services/Post/post";
import { UserApiCall } from "../services/User/user";

interface PostState{
  posts:IPostInfo[]
}

const initialState: PostState = {
  posts:[]
};

export const fetchPostByUserId = createAsyncThunk(
'post/fetchPostByUserId',
  async (_id: string) => {
    if (_id != null) {
      try {
        const res = await PostApiCall.getPostByUserId(_id);
        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: { 
   
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostByUserId.fulfilled, (state, action) => {
        state.posts = action.payload
    });
  },
});

export const { } = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.posts;

export default postSlice.reducer;