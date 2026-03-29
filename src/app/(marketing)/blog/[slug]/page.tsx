import { blogs } from "@/data/blog";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  User,
  Mail,
  Sparkles,
  Globe,
  Github,
  Linkedin,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/features/marketing/ReadingProgress";
import { ShareButton } from "@/components/features/marketing/ShareButton";
import { NewsletterSection } from "@/components/home/NewsletterSection";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | EcoSpark Hub`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  const socialLinks = [
    { icon: Globe, href: "https://shihab-dev.web.app/", label: "Website" },
    {
      icon: Facebook,
      href: "https://www.facebook.com/shihab.dev",
      label: "Facebook",
    },
    {
      icon: Github,
      href: "https://github.com/shihabuddin-dev",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/shihab-dev/",
      label: "LinkedIn",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-primary/20">
      <ReadingProgress />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[700px] w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-x-0 bottom-0 py-12 lg:py-24">
          <div className="container mx-auto px-6 max-w-5xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 text-white/80 hover:text-white mb-10 group transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all border border-white/20">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-tight text-lg">
                Back to Insights
              </span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-5 py-2 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30">
                {blog.category}
              </span>
              <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                <Clock className="h-4 w-4" />
                {blog.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.95] mb-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between border-t border-white/10 pt-10">
              <div className="flex items-center gap-5">
                <div className="h-16 w-16 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-xl tracking-tight">
                    {blog.author}
                  </p>
                  <p className="text-white/60 font-bold">{blog.date}</p>
                </div>
              </div>

              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl py-24">
        <div className="relative">
          {/* Content Header Accent */}
          <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/20 to-transparent hidden lg:block rounded-full opacity-50" />

          <div
            className="text-zinc-600 dark:text-zinc-400 text-xl leading-[1.8] font-medium
              [&_h3]:text-3xl [&_h3]:font-black [&_h3]:text-zinc-900 [&_h3]:dark:text-white [&_h3]:mt-16 [&_h3]:mb-6 [&_h3]:tracking-tight
              [&_p]:mb-8
              [&_blockquote]:my-16 [&_blockquote]:bg-zinc-50 [&_blockquote]:dark:bg-zinc-900/50 [&_blockquote]:p-12 [&_blockquote]:rounded-[3rem] [&_blockquote]:border-l-8 [&_blockquote]:border-primary [&_blockquote]:italic [&_blockquote]:text-2xl [&_blockquote]:text-zinc-900 [&_blockquote]:dark:text-white [&_blockquote]:font-bold
              [&_img]:rounded-[3rem] [&_img]:shadow-2xl [&_img]:my-12
              [&_a]:text-primary [&_a]:underline [&_a]:font-bold
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Minimal Author Bio */}
          <div className="mt-24 pt-16 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="h-20 w-20 rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 overflow-hidden ring-4 ring-zinc-50 dark:ring-zinc-900 shadow-sm">
              <img
                src="https://shihab-dev.web.app/_next/static/media/shihab.4f9f0e13.png"
                alt="Shihab Uddin"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h4 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {blog.author}
                </h4>
                <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest">
                  Sustainability Advocate & Developer
                </p>
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl">
                Dedicated to bridging the gap between technology and
                environmental innovation. Shihab works with the EcoSpark
                community to transform grassroots ideas into sustainable
                realities through code and advocacy.
              </p>

              <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                {socialLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    target="_blank"
                    className="text-zinc-400 hover:text-primary transition-colors transition-transform hover:scale-110"
                    title={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-20 flex flex-wrap gap-4">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-6 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 text-sm font-black border border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:text-primary transition-all cursor-default"
            >
              #{tag.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Newsletter CTA */}
        <NewsletterSection />
      </section>

      {/* Related Posts */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-32 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-20">
            <div className="space-y-2">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter">
                Continue Reading
              </h2>
              <p className="text-zinc-500 font-bold text-lg">
                More insights from the EcoSpark community.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center gap-3 font-black text-primary hover:gap-5 transition-all group text-lg"
            >
              View all posts{" "}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[16/11] rounded-[3rem] overflow-hidden mb-8 shadow-xl shadow-zinc-200/50 dark:shadow-none bg-zinc-200 dark:bg-zinc-800">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-black tracking-widest uppercase text-primary">
                    <span>{post.category}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">
                      &bull;
                    </span>
                    <span className="text-zinc-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-black leading-none tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 font-bold line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
