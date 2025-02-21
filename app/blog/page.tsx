import Link from 'next/link';
import React from 'react';
import { allBlogs } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Redis } from '@upstash/redis';
import BlogList from './list';

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function BlogsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allBlogs.map((p) => ['pageviews', 'blogs', p.slug].join(':'))
    )
  ).reduce((acc, v, i) => {
    acc[allBlogs[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className='relative pb-16'>
      <Navigation />
      <div className='px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32'>
        <div className='max-w-2xl mx-auto lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Blogs
          </h2>
          <p className='mt-4 text-zinc-400'>
            A digital record of what I've been working on.
          </p>
        </div>
        <div className='w-full h-px bg-zinc-800 mt-8' />
        <BlogList blogs={allBlogs} views={views} />
      </div>
    </div>
  );
}
