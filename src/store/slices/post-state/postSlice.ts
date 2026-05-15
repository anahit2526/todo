import { API } from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Post {
  title: string;
  body: string;
  id: number;
}
interface CreatePostPayload {
  title: string;
  body: string;
}
interface PostState {
  title: string;
  body: string;
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  title: '',
  body: '',
  posts: [],
  loading: false,
  error: null
};

const callpost = async (post: CreatePostPayload) => {
  const response = await API.post('/posts', {
    title: post.title,
    body: post.body,
    userId: 1
  });
  return response.data;
};

export const createPosts = createAsyncThunk(
  'post/createPost',
  async (post: CreatePostPayload, { rejectWithValue }) => {
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
      state.title = action.payload;
    },

    setBody: (state, action) => {
      state.body = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
        state.title = '';
        state.body = '';
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
