import { useAppSelector } from '@/hooks'
import { Link } from 'react-router-dom'
import { selectAllPosts } from './postsSlice'
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from '@/components/TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id} className="post-excerpt">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title} </Link>
      </h3>

      <p className="post-content"> {post.content.substring(0, 100)} </p>

      <PostAuthor userId={post.user} />

      <TimeAgo timestamp={post.date}/>

      <ReactionButtons post={post}/>
      
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
