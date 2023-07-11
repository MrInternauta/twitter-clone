import usePosts from '@/hooks/usePosts'
import React, { FC } from 'react'
import { PostItem } from './PostItem';
interface PostsFeedProps {
  userId?: string
}
export const PostsFeed: FC<PostsFeedProps> = ({userId}) => {
  const {data: posts = []} = usePosts(userId);

  return (
    <>
    { posts.map((item: Record<string, any>) => {
      return <PostItem userId={item?.userId} key={item?.id}  data={item}/>
    })}
    </>
  )
}
