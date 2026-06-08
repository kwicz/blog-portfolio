import { notFound } from 'next/navigation';
import { allProjects } from 'contentlayer/generated';
import { Header } from './header';
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
    <div>
      <Header project={project} />
      <ReportView slug={project.slug} />

      {/* ── Testimonials ───────────────────────────────────── */}
      <section style={{ borderTop: '1px solid var(--surface-line)', padding: '72px 0' }}>
        <div className="container">
          <EditorialHeader eyebrow="Kind words" title="What people say." />
          <div className="testimonial-grid">
            {[
              { body: "Intuitive, collaborative, and helpful — Katy knows how to solve your problem and has consistently provided numerous sources of knowledge and personal growth. Katy wants everyone around her to excel and goes out of her way to help people find their strengths. I would jump at the opportunity to work with her again." },
              { body: "Few people I've worked with in my professional career have brought as much positivity, wit, and creativity to the job. I've found her to be driven, adaptable, passionate, and able to focus on the details while not losing sight of the mission. Her professionalism and empathy make her a true joy to work with." },
              { body: "...is playing so many roles right now and shaping new projects and creating efficiencies in everything." },
              { body: "...is an incredible collaborator, always bringing curiosity, ambition, and a can-do attitude to every project." },
              { body: "...is always sharing knowledge and skills to help the team and help others level up." },
              { body: "...has been a pleasure to watch as they approach new projects with creative confidence." },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-body">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related work ───────────────────────────────────── */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--surface-line)', padding: '72px 0' }}>
          <div className="container">
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
                  tags={p.tags}
                  ribbon={p.ribbon}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <PdpSticky
        title={project.title}
        category={project.category}
        image={project.image}
        url={project.url}
      />
    </div>
  );
}
