import { useDispatch } from "react-redux"
import { Post, postAdded } from "./postsSlice"
import { nanoid } from "@reduxjs/toolkit"

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    console.log('Values', { title, content })
   
    dispatch(postAdded(title,content));
    e.currentTarget.reset()
  }

  return (
    <section>
      <h2> Add a New Post </h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle"> Post Title:</label>

        <input type="text" id="postTitle" defaultValue="" required />

        <label htmlFor="postContent"> Content: </label>

        <textarea id="postContent" name="postContent" defaultValue="" required />

        <button> Save Post </button>
      </form>
    </section>
  )
}
