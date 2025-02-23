export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative min-h-screen bg-gradient-to-tl from-slate via-slate to-slate'>
      {children}
    </div>
  );
}

{
  /* <div className='relative min-h-screen bg-gradient-to-tl from-slate via-slate to-slate '>
{children}
</div> */
}
