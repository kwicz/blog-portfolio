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

        {(project.rating !== undefined && project.reviewCount !== undefined) && (
          <section id="reviews" style={{ marginTop: 80 }}>
            <EditorialHeader eyebrow={`${project.reviewCount} reviews`} title="What people say." />
            <div className="reviews-summary">
              <div>
                <div className="reviews-avg">{project.rating.toFixed(1)}</div>
                <div className="pdp-stars">
                  {'★★★★★'.slice(0, Math.round(project.rating)).split('').map((s, i) => (
                    <span key={i} style={{ color: 'var(--accent-honey)', fontSize: 18 }}>{s}</span>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>{project.reviewCount} written reviews</div>
              </div>
              <div className="reviews-bars">
                {[5, 4, 3, 2, 1].map(stars => {
                  const total = project.reviewCount ?? 1;
                  const weights: Record<number, number> = { 5: 0.78, 4: 0.16, 3: 0.04, 2: 0.01, 1: 0.01 };
                  const count = Math.round(total * weights[stars]);
                  return (
                    <div key={stars} className="reviews-bar">
                      <span>{stars}★</span>
                      <div className="reviews-bar-track"><div className="reviews-bar-fill" style={{ width: `${(count / total) * 100}%` }} /></div>
                      <span>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {((project.sampleReviews ?? []) as Array<{ rating: number; name: string; loc: string; title: string; body: string }>).map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-meta">
                    <div style={{ color: 'var(--accent-honey)', fontSize: 14, marginBottom: 8 }}>{'★'.repeat(r.rating)}</div>
                    <div className="review-author">{r.name}</div>
                    <div className="review-loc">{r.loc}</div>
                  </div>
                  <div>
                    <div className="review-title">{r.title}</div>
                    <p className="review-body">{r.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
                  image={p.image}
                  rating={p.rating}
                  reviewCount={p.reviewCount}
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
