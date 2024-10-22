import { useAppSelector } from '@/hooks'
import { selectUserById } from '../users/usersSlice'

interface PostAuthorProps {
  userId: string
  showPrefix?: boolean
}

export const PostAuthor = ({ userId, showPrefix }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span>
      {showPrefix ? 'by' : null} {author?.name ?? 'Unknown author'}
    </span>
  )
}
