import { useAppSelector } from '@/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectCurrentUsername } from '../auth/authSlice'
import { useGetPostQuery } from '../api/apiSlice'
import { ReactNode } from 'react'
import { Spinner } from '@/components/Spinner'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const {data:post, isFetching,isSuccess} = useGetPostQuery(postId!);

  const currentUsername = useAppSelector(selectCurrentUsername)!

  let content: ReactNode;

  const canEdit = currentUsername === post?.user;



  if (!post && !isSuccess && !isFetching) {
    content =  (
      <section>
        <h2> Post not found! </h2>
      </section>
    )
  }

  if(isFetching) {
    content = <Spinner text="Loading..."/>;
  }

  if(isSuccess) {
    content = <section>
    <article className="post">
      <h2>{post.title}</h2>

      <p className="post-content">{post.content}</p>

      <PostAuthor userId={post.user} />

      <ReactionButtons post={post}/>


      <TimeAgo timestamp={post.date}/>

      {canEdit && (
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      )}
    </article>
  </section>
  }

  return <section> {content} </section>;
}
