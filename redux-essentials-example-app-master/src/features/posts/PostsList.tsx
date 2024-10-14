import { useAppSelector } from '@/hooks'
import { Link } from 'react-router-dom'

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts)

  const renderedPosts = posts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title} </Link>
      </h3>

      <p className="post-content"> {post.content.substring(0, 100)} </p>
      
      <Link to={`/editPost/${post.id}`}  className='button'> Edit Post </Link>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2> Posts </h2>
      {renderedPosts}
    </section>
  )
}
