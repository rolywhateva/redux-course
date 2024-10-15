import { RootState } from '@/store'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: string
  title: string
  content: string
  user:string
}

type PostUpdate = Pick<Post,'id'|'title'|'content'>;

const initialState: Post[] = [
  {
    id: '1',
    title: 'First post!',
    content: 'Hello!',
    user:'0'
  },
  {
    id: '2',
    title: 'Second post!',
    content: 'More text',
    user:'2'
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string,userId:string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user:userId
          },
        }
      },
    },

    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
  selectors:{
    selectAllPosts: postsState=>postsState,
    selectPostById:(postsState,postId:string)=> postsState.find(post=>post.id === postId)
  }
})

export const { postAdded, postUpdated } = postsSlice.actions
export const {selectAllPosts, selectPostById} = postsSlice.selectors;
export default postsSlice.reducer



