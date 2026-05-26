import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import './mdx.css';
import { ReportView } from './view';
import { Redis } from '@upstash/redis';
import Link from 'next/link';
import { ProductCard } from '@/app/components/product-card';

export const revalidate = 60;

type Props = { params: { slug: string } };

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allProjects
    .filter(p => p.published)
    .map(p => ({ slug: p.slug }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find(p => p.slug === slug);

  if (!project) notFound();

  const views =
    (await redis.get<number>(['pageviews', 'projects', slug].join(':'))) ?? 0;

  const related = allProjects
    .filter(p => p.slug !== slug && p.published !== false && p.category === project.category)
    .slice(0, 3);

  return (
    <div style={{ paddingBottom: 80 }}>
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <div className="container" style={{ paddingTop: 56 }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <article className="prose prose-slate dark:prose-invert prose-quoteless">
            <Mdx code={project.body.code} />
          </article>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, margin: 0 }}>
                More work
              </h2>
              <Link href="/projects" className="btn btn-ghost" style={{ fontSize: 13 }}>
                All projects →
              </Link>
            </div>
            <div className="prod-grid">
              {related.map(p => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  description={p.description}
                  image={p.image}
                  category={p.category}
                  url={p.url}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
