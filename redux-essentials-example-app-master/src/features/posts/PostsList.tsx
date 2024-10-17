import { useAppDispatch, useAppSelector } from '@/hooks'
import { Link } from 'react-router-dom'
import { fetchPosts, selectAllPosts, selectPostsError, selectPostsStatus } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useEffect } from 'react'
import { Spinner } from '@/components/Spinner'

export const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts)
  const postsStatus = useAppSelector(selectPostsStatus)
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    postsStatus === 'idle' && dispatch(fetchPosts())
  }, [postsStatus, dispatch])

  return (
    <section className="posts-list">
      <h2> Posts </h2>

      {postsStatus === 'pending' && <Spinner text="Loading..." />}

      {postsStatus === 'failed' && <div> {postsError} </div>}

      {postsStatus === 'succeeded' &&
        posts
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((post) => (
            <article key={post.id} className="post-excerpt">
              <h3>
                <Link to={`/posts/${post.id}`}>{post.title} </Link>
              </h3>

              <p className="post-content"> {post.content.substring(0, 100)} </p>

              <PostAuthor userId={post.user} />

              <TimeAgo timestamp={post.date} />

              <ReactionButtons post={post} />

              {/* <Link to={`/editPost/${post.id}`}  className='button'> Edit Post </Link> */}
            </article>
          ))}
    </section>
  )
}
