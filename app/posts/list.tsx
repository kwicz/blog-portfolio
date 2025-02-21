'use client';

import { useState } from 'react';
import { Card } from '../components/card';
import { Article } from './article';

<<<<<<< HEAD:app/posts/list.tsx
interface Post {
  slug: string;
  title: string;
  published: boolean;
}

interface PostListProps {
  posts: Post[];
  views: { [key: string]: number };
}

export default function PostList({ posts, views }: PostListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts
=======
export default function BlogList({ blogs, views }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs
>>>>>>> 99db3f2cfea3422d9ebdd4e8da483772db2ad914:app/blog/list.tsx
    .filter((p) => p.published)
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='mt-4'>
      <input
        type='text'
<<<<<<< HEAD:app/posts/list.tsx
        placeholder='Search post titles...'
=======
        placeholder='Search blogs titles...'
>>>>>>> 99db3f2cfea3422d9ebdd4e8da483772db2ad914:app/blog/list.tsx
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mt-4 p-2 w-full rounded bg-zinc-800 text-zinc-100'
      />

      <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3 mt-8'>
<<<<<<< HEAD:app/posts/list.tsx
        {filteredPosts.map((post: Post) => (
          <Card key={post.slug}>
            <Article post={post} views={views[post.slug] ?? 0} />
=======
        {filteredBlogs.map((blog) => (
          <Card key={blog.slug}>
            <Article blog={blog} views={views[blog.slug] ?? 0} />
>>>>>>> 99db3f2cfea3422d9ebdd4e8da483772db2ad914:app/blog/list.tsx
          </Card>
        ))}
      </div>
    </div>
  );
}
