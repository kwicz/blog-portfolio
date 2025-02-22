import Link from 'next/link';
import React from 'react';
import { allProjects } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';
import { Article } from './article';
import { Redis } from '@upstash/redis';
import { Eye } from 'lucide-react';

const redis = Redis.fromEnv();

export const revalidate = 60;
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ['pageviews', 'projects', p.slug].join(':'))
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const categories = Array.from(new Set(allProjects.map((p) => p.category)));
  const selectedCategory = searchParams.category || null;

  const filteredProjects = selectedCategory
    ? allProjects.filter((p) => p.category === selectedCategory)
    : allProjects;

  return (
    <div className='relative pb-16'>
      <Navigation />
      <div className='px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32'>
        <div className='max-w-2xl mx-auto lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Projects
          </h2>
          <p className='mt-4 text-zinc-400 mb-4'>
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className='w-full h-px bg-zinc-800 mb-4' />
        <div className='mt-8 flex flex-wrap gap-2 mb-8'>
          <Link
            href='/projects'
            className={`px-4 py-2 rounded ${
              !selectedCategory
                ? 'bg-zinc-800 text-white'
                : 'bg-zinc-600 text-zinc-300'
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/projects?category=${category}`}
              className={`px-4 py-2 rounded ${
                selectedCategory === category
                  ? 'bg-zinc-800 text-white'
                  : 'bg-zinc-600 text-zinc-300'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
        <div className='grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3'>
          {filteredProjects.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={views[project.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
