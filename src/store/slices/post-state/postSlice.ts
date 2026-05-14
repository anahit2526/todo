import { API } from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface PostState {
  post: {
    title: string;
    body: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  post: {
    title: '',
    body: ''
  },
  loading: false,
  error: null
};
interface UserPostInput {
  post: {
    title: string;
    body: string;
  };
}

const callpost = async (post: UserPostInput) => {
  const response = await API.post('/posts', {
    title: post.post.title,
    body: post.post.body,
    userId: 1
  });
  return response.data;
};

export const createPosts = createAsyncThunk(
  'post/createPost',
  async (post: UserPostInput, { rejectWithValue }) => {
    try {
      return await callpost(post);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.post.title = action.payload;
    },

    setBody: (state, action) => {
      state.post.body = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'An error occurred';
      });
  }
});

export const { setTitle, setBody } = postSlice.actions;

export default postSlice.reducer;
