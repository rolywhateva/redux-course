import { useAppSelector } from '@/hooks'
import { useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const post = useAppSelector(state=>selectPostById(state,postId!));

  if (!post) {
    return (
      <section>
        <h2> Post not found! </h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>

        <p className="post-content">{post.content}</p>

        <PostAuthor userId={post.user} />

        <ReactionButtons post={post}/>


        <TimeAgo timestamp={post.date}/>
      </article>
    </section>
  )
}
