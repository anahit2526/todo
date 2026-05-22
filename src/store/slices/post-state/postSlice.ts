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

const createPostApi = async (post: CreatePostPayload) => {
  const response = await API.post('/posts', {
    title: post.title,
    body: post.body
  });
  return response.data;
};

export const createPost = createAsyncThunk(
  'post/createPost',
  async (post: CreatePostPayload, { rejectWithValue }) => {
    try {
      return await createPostApi(post);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push({
          ...action.payload,
          id: Date.now()
        });
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'An error occurred';
      });
  }
});

export const { updatePost } = postSlice.actions;

export default postSlice.reducer;
