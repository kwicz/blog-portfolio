import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import './mdx.css';
import { ReportView } from './view';
import { Redis } from '@upstash/redis';

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allPosts
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const views =
    (await redis.get<number>(['pageviews', 'posts', slug].join(':'))) ?? 0;

  return (
    <div style={{ paddingBottom: 80 }}>
      <Header post={post} views={views} />
      <ReportView slug={post.slug} />

      <div className="container" style={{ paddingTop: 8 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <article className="prose prose-quoteless">
            <Mdx code={post.body.code} />
          </article>
        </div>
      </div>
    </div>
  );
}
