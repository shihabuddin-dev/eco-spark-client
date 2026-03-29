export const IdeaCardSkeleton = ({ count = 8 }: { count?: number }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(count)].map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 animate-pulse"
          >
            {/* Image Block */}
            <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900" />
            
            {/* Content Region */}
            <div className="flex flex-1 flex-col p-6">
              {/* Category Badge */}
              <div className="mb-4 h-4 w-20 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
              
              {/* Title Placeholder */}
              <div className="mb-3 h-6 w-3/4 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
              
              {/* Description Placeholder */}
              <div className="space-y-2 mb-6">
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-900 rounded" />
                <div className="h-3 w-5/6 bg-zinc-100 dark:bg-zinc-900 rounded" />
              </div>
              
              {/* Footer Region */}
              <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex gap-3">
                  <div className="h-4 w-8 bg-zinc-100 dark:bg-zinc-900 rounded" />
                  <div className="h-4 w-8 bg-zinc-100 dark:bg-zinc-900 rounded" />
                </div>
                <div className="h-4 w-20 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
