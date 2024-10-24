import { Link } from 'react-router-dom'
import { Post } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '@/components/Spinner'
import { useGetPostsQuery } from '../api/apiSlice'
import React, { useMemo } from 'react'

interface PostExcerptProps {
  post: Post
}

export const PostExcerpt = ({ post }: PostExcerptProps) => {
  return (
    <article key={post.id} className="post-excerpt">
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title} </Link>
      </h3>

      <p className="post-content"> {post.content.substring(0, 100)} </p>

      <PostAuthor userId={post.user} />

      <TimeAgo timestamp={post.date} />

      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const { data: posts = [], isLoading, isSuccess, isError, error } = useGetPostsQuery()

  const sortedPosts = useMemo(()=>{
     const sortedPosts = posts.slice();
     
     sortedPosts.sort((a,b)=>b.date.localeCompare(a.date));
     return sortedPosts;

  },[posts]);
  let content: React.ReactNode

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = sortedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
  } else if (isError) {
    content = <div> {error.toString()} </div>
  }

  return (
    <section className="posts-list">
      <h2> Posts </h2>

      {content}
    </section>
  )
}
