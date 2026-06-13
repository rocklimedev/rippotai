'use client';

const SKELETON_STYLES = `
@keyframes sk-pulse {
  0%,100% { opacity:1; }
  50% { opacity:.45; }
}

.sk {
  background:#e8e4df;
  animation:sk-pulse 1.6s ease-in-out infinite;
}
`;

const Box = ({ className = '' }) => <div className={`sk ${className}`} />;

export default function ProjectDetailSkeleton() {
  return (
    <>
      <style>{SKELETON_STYLES}</style>

      <main className="bg-white overflow-x-hidden">
        {/* HERO */}
        <section className="relative w-full h-[75vh]">
          <Box className="absolute inset-0" />
        </section>

        {/* TITLE + DESCRIPTION */}
        <section className="py-[35px] px-[35px] md:px-[35px]">
          <div className="max-w-5xl">
            <Box className="h-16 w-3/4 mb-8" />

            <Box className="h-6 w-full mb-4" />
            <Box className="h-6 w-[92%]" />
            <Box className="h-6 w-[85%]" />
          </div>
        </section>

        {/* TWO BIG SQUARES - FULL BLEED */}
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            <Box className="aspect-square w-full" />
            <Box className="aspect-square w-full" />
          </div>
        </section>
        {/* RECTANGLE 1 */}
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-0">
          <Box className="w-full h-[600px]" />
        </section>

        {/* DETAILS 1 */}
        <section className="py-[35px] px-[35px] md:px-[35px]">
          <div className="max-w-5xl">
            <Box className="h-16 w-3/4 mb-8" />

            <Box className="h-6 w-full mb-4" />
            <Box className="h-6 w-[92%]" />
            <Box className="h-6 w-[85%]" />
          </div>
        </section>

        {/* RECTANGLE 2 */}
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-0">
          <Box className="w-full h-[600px]" />
        </section>
        {/* DETAILS 2 */}
        <section className="py-[35px] px-[35px] md:px-[35px]">
          <div className="max-w-5xl">
            <Box className="h-16 w-3/4 mb-8" />

            <Box className="h-6 w-full mb-4" />
            <Box className="h-6 w-[92%]" />
            <Box className="h-6 w-[85%]" />
          </div>
        </section>
        {/* TWO BIG SQUARES AGAIN - FULL BLEED */}
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            <Box className="aspect-square w-full" />
            <Box className="aspect-square w-full" />
          </div>
        </section>

        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] items-center">
            {/* LEFT IMAGE */}
            <Box className="aspect-square w-full" />

            {/* RIGHT CONTENT */}
            <div className="px-6 md:px-12 flex flex-col gap-[10px]">
              <Box className="h-10 w-72" />

              <Box className="h-5 w-full" />
              <Box className="h-5 w-full" />
              <Box className="h-5 w-[90%]" />
              <Box className="h-5 w-[82%]" />
            </div>
          </div>
        </section>
        {/* RECTANGLE 3 */}
        <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-0">
          <Box className="w-full h-[600px]" />
        </section>

        {/* DETAILS 4 */}
        <section className="py-[35px] px-[35px] md:px-[35px]">
          <div className="max-w-5xl">
            <Box className="h-16 w-3/4 mb-8" />

            <Box className="h-6 w-full mb-4" />
            <Box className="h-6 w-[92%]" />
            <Box className="h-6 w-[85%]" />
          </div>
        </section>

        {/* RECOMMENDED PROJECTS */}
        <section className="pt-20 pb-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <Box className="aspect-square w-full mb-5" />
                  <Box className="h-6 w-3/4 mb-3" />
                  <Box className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
