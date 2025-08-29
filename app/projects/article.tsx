import type { Project } from '@/.contentlayer/generated';
import Link from 'next/link';
import { Eye, View } from 'lucide-react';
import Image from 'next/image';

type Props = {
  project: Project;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className='p-4 md:p-8'>
        <div className='flex justify-between gap-2 items-center'>
          <span className='text-xs duration-1000 text-slate border-slate dark:text-ivory group-hover:border-slate drop-shadow-orange'>
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                  new Date(project.date)
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          {/* <span className='text-rose text-xs flex items-center gap-1 dark:text-gold'>
            <Eye className='w-4 h-4' />{' '}
            {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
          </span> */}
        </div>

        {project.image && (
          <div className='relative zw-full z-20 mt-4 mb-4 overflow-hidden rounded-lg shadow-lg'>
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className='object-cover'
              unoptimized
            />
          </div>
        )}
        <h2 className='z-20 text-xl font-medium duration-300 lg:text-3xl text-slate dark:text-ivory font-display'>
          {project.title}
        </h2>
        <p className='z-20 mt-4 text-sm  duration-300 text-ivory-400 group-hover:text-ivory-200'>
          {project.description}
        </p>
      </article>
    </Link>
  );
};
