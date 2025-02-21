'use client';

import { useState } from 'react';
import { Card } from '../components/card';
import { Article } from './article';

export default function BlogList({ blogs, views }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs
    .filter((p) => p.published)
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='mt-4'>
      <input
        type='text'
        placeholder='Search blogs titles...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='mt-4 p-2 w-full rounded bg-zinc-800 text-zinc-100'
      />

      <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3 mt-8'>
        {filteredBlogs.map((blog) => (
          <Card key={blog.slug}>
            <Article blog={blog} views={views[blog.slug] ?? 0} />
          </Card>
        ))}
      </div>
    </div>
  );
}
