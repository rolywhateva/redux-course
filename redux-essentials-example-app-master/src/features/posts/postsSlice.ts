import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { userLoggedOut } from '../auth/authSlice'
import { client } from '@/api/client'
import { createAppAsyncThunk } from '@/withTypes'

export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
}

interface PostsState {
  posts: Post[]
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
}

export type ReactionName = keyof Reactions

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
  reactions: Reactions
}

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<Post[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postStatus = selectPostsStatus(thunkApi.getState())
      if (postStatus !== 'idle') {
        return false
      }
    },
  },
)

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>
export type NewPost = Pick<Post,'title'|'content'|'user'>;

export const addNewPost = createAppAsyncThunk('posts/addNewPost', async (initialPost: NewPost)=>{
  const response = await client.post<Post>('/fakeApi/posts',initialPost);

  return response.data;
});

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  selectors: {
    selectAllPosts: (postsState) => postsState.posts,
    selectPostById: (postsState, postId: string) => postsState.posts.find((post) => post.id === postId),
    selectPostsStatus: (postsState) => postsState.status,
    selectPostsError: (postsState) => postsState.error,
  },

  extraReducers: (builder) => {
    builder
      .addCase(userLoggedOut, (state) => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown error'
      }).addCase(addNewPost.fulfilled,(state,action)=>{
        state.posts.push(action.payload);
      })
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions
export const { selectAllPosts, selectPostById, selectPostsStatus, selectPostsError } = postsSlice.selectors
export default postsSlice.reducer
