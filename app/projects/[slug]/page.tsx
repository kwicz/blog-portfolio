import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import './mdx.css';
import { ReportView } from './view';
import { Redis } from '@upstash/redis';
import Image from 'next/image';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(['pageviews', 'projects', slug].join(':'))) ?? 0;

  return (
    <div className='min-h-screen bg-ivory text-slate dark:bg-slate dark:text-ivory transition-colors duration-300'>
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className='px-4 py-12 mx-auto prose prose-slate dark:prose-invert prose-quoteless'>
        {project.image ? (
          <div className='relative zw-full z-20 mt-4 mb-4 overflow-hidden'>
            <Image
              src={project.image ?? '/default-image.jpg'}
              alt={project.title}
              width={600}
              height={400}
              className='object-cover'
              unoptimized
            />
          </div>
        ) : null}
        <Mdx code={project.body.code} />
      </article>
    </div>
  );
}
