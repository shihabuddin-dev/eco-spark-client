export const IdeaDetailsSkeleton = () => {
    return (
      <div className="flex flex-col lg:flex-row gap-20 animate-pulse">
        {/* Main Content Skeleton - Left */}
        <div className="flex-1 space-y-24">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-6 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-16 md:h-24 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
            </div>
            <div className="aspect-[21/9] w-full bg-zinc-100 dark:bg-zinc-800 rounded-[3rem]" />
          </div>
  
          <div className="max-w-3xl space-y-24">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-8">
                <div className="h-4 w-32 bg-zinc-100 dark:bg-zinc-800 rounded" />
                <div className="space-y-4">
                  <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                  <div className="h-8 w-11/12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                  <div className="h-8 w-9/12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Control Center Skeleton - Right */}
        <div className="lg:w-[320px] shrink-0 space-y-12">
          <div className="sticky top-24 space-y-12">
            <div className="space-y-8">
              <div className="flex justify-between px-2">
                <div className="space-y-2">
                  <div className="h-10 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-10 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
                <div className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl" />
              </div>
              <div className="space-y-4 px-4">
                <div className="h-6 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-800 rounded" />
              </div>
            </div>
            <div className="h-[400px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-[3rem]" />
          </div>
        </div>
      </div>
    );
  };
