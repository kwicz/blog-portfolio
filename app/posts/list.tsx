'use client';

import { useState } from 'react';
import { Card } from '../components/card';
import { Article } from './article';
import { Post as GeneratedPost } from '../../.contentlayer/generated/types';

interface Post extends GeneratedPost {
  views?: number;
}

interface PostListProps {
  posts: Post[];
  views: { [key: string]: number };
}

export default function PostList({ posts, views }: PostListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts
    .filter((p) => p.published)
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input
        type='text'
        placeholder='Search post titles...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mt-4 p-2 w-full rounded transition-colors duration-300 
          bg-ivory text-slate border border-slate 
          dark:bg-blue-200/20 dark:text-ivory dark:opacity-70'
      />
      <div className='grid grid-cols-1 gap-4 mx-auto mt-8'>
        {filteredPosts.map((post: Post) => (
          <Card key={post.slug}>
            <Article post={post} views={views[post.slug] ?? 0} />
          </Card>
        ))}
      </div>
    </div>
  );
}
