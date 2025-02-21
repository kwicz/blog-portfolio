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
        className='mt-4 p-2 w-full rounded bg-zinc-800 text-zinc-100'
      />

      <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3 mt-8'>
        {filteredPosts.map((post: Post) => (
          <Card key={post.slug}>
            <Article post={post} views={views[post.slug] ?? 0} />
          </Card>
        ))}
      </div>
    </div>
  );
}
