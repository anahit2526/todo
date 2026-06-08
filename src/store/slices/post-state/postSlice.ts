import { API } from '@/api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@reduxjs/toolkit/query';

interface Post {
  title: string;
  body: string;
  id: number;
  isCustom?: boolean;
  isEdited?: boolean;
}
interface CreatePostPayload {
  title: string;
  body: string;
}
interface PostState {
  title: string;
  body: string;
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  title: '',
  body: '',
  posts: [],
  currentPost: null,
  loading: false,
  error: null
};

const fetchPostsFromAPI = async () => {
  const response = await API.get('/posts');
  return response.data;
};
export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>('posts/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchPostsFromAPI();
  } catch (error) {
    return rejectWithValue('error');
  }
});
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

const updatePostApi = async (post: Post) => {
  const response = await API.put(`/posts/${post.id}`, {
    id: post.id,
    title: post.title,
    body: post.body
  });
  return response.data;
};
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async (post: Post, { rejectWithValue }) => {
    try {
      if (post.isCustom) {
        return post;
      }

      return await updatePostApi(post);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getPostByIdApi = async (id: string) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};
export const getPostById = createAsyncThunk(
  'post/getByIdPost',
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const apiPost = await getPostByIdApi(id);

      const state = getState() as RootState;

      const editedPost = state.post.posts.find(
        (post) => post.id === Number(id) && post.isEdited
      );

      return editedPost || apiPost;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift({
          ...action.payload,
          id: state.posts.length + 1,
          isCustom: true
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
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;

        const customPosts = state.posts.filter((post) => post.isCustom);
        const editedPosts = state.posts.filter((post) => post.isEdited);

        const apiPosts = action.payload.map((post) => {
          const edited = editedPosts.find((p) => p.id === post.id);

          return edited || post;
        });
        state.posts = [...customPosts, ...apiPosts];
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );

        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
            isEdited: true
          };
        }
      });
  }
});

export default postSlice.reducer;
