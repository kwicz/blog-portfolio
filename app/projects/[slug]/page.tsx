import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { Mdx } from '@/app/components/mdx';
import { Header } from './header';
import './mdx.css';
import { ReportView } from './view';
import { Redis } from '@upstash/redis';
import { ProductCard } from '@/app/components/product-card';
import { EditorialHeader } from '@/app/components/editorial-header';
import { PdpSticky } from '@/app/components/pdp-sticky';

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

  const sameCat = allProjects.filter(p => p.slug !== slug && p.published !== false && p.category === project.category);
  const related = sameCat.length >= 4
    ? sameCat.slice(0, 4)
    : [...sameCat, ...allProjects.filter(p => p.slug !== slug && p.published !== false && p.category !== project.category)].slice(0, 4);

  return (
    <div style={{ paddingBottom: 120 }}>
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
            <EditorialHeader
              eyebrow="Goes well with"
              title="More work."
              seeMoreHref="/projects"
              seeMoreLabel="All projects"
            />
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

      <PdpSticky
        title={project.title}
        category={project.category}
        image={project.image}
        url={project.url}
      />
    </div>
  );
}
