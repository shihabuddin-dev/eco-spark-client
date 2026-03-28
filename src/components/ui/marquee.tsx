import { cn } from '@/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: unknown;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex shrink-0 justify-around [gap:var(--gap)]',
              vertical
                ? reverse
                  ? 'animate-marquee-vertical-reverse flex-col'
                  : 'animate-marquee-vertical flex-col'
                : reverse
                  ? 'animate-marquee-reverse flex-row'
                  : 'animate-marquee flex-row',
              pauseOnHover && 'group-hover:[animation-play-state:paused]'
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
