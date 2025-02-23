import Link from 'next/link';
import React from 'react';
import { allPosts } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Redis } from '@upstash/redis';
import PostList from './list';

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function PostsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allPosts.map((p) => ['pageviews', 'posts', p.slug].join(':'))
    )
  ).reduce((acc, v, i) => {
    acc[allPosts[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className='relative pb-16 bg-ivory text-slate dark:bg-slate dark:text-ivory transition-colors duration-300'>
      <Navigation />
      <div className='px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32'>
        <div className='mx-auto lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-slate dark:text-ivory sm:text-4xl'>
            Blog
          </h2>
          <p className='mt-4 text-slate-600 dark:text-slate-300 mb-4'>
            A digital record of what I've been working on.
          </p>
        </div>

        <div className='w-full h-px bg-slate dark:bg-ivory mb-4' />

        <PostList posts={allPosts} views={views} />
      </div>
    </div>
  );
}
