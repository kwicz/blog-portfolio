export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative min-h-screen bg-ivory dark:bg-gradient-to-tl dark:from-slate dark: via-slate dark:to-slate'>
      {children}
    </div>
  );
}
