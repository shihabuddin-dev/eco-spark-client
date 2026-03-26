"use client";

export const DashboardChart = () => {
  return (
    <div className="w-full h-full flex items-end justify-between gap-1 px-2 pt-8 pb-4">
      {[40, 70, 45, 90, 65, 80, 55, 95, 75, 60, 85, 50].map((height, i) => (
        <div 
          key={i} 
          className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all duration-500 ease-out group relative"
          style={{ height: `${height}%` }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {height}%
          </div>
        </div>
      ))}
    </div>
  );
};
