import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import { Reveal } from "../components/reveal";
import { formatDate, getPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — Gambit",
  description:
    "Artigos sobre tecnologia, inteligência artificial, automação e presença digital para empresas que querem evoluir.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 pt-20 pb-12 text-center sm:pt-28">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Blog
          </p>
          <h1 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Tecnologia sem jargão
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-600">
            Ideias práticas sobre IA, automação e presença digital para o seu
            negócio dar a próxima jogada.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                    {post.category}
                  </span>
                  <h2 className="mt-5 font-serif text-xl leading-snug group-hover:underline">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">
                    {post.excerpt}
                  </p>
                  <p className="mt-6 text-xs text-zinc-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
