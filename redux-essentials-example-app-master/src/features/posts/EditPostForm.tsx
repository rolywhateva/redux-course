import { useAppSelector } from '@/hooks'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postUpdated, selectPostById } from './postsSlice'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector(state=>selectPostById(state,postId!));

  if (!post) {
    return (
      <section>
        <h2> Post not found! </h2>
      </section>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(postUpdated({ id: post.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2> Edit Post </h2>

      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle"> Post Title </label>

        <input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required />

        <label htmlFor="postContent"> Content : </label>

        <textarea id="postContent" name="postContent" defaultValue={post.content} required />

        <button> Save Post </button>
      </form>
    </section>
  )
}
