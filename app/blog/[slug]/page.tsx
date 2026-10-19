import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";
import { formatDate, getPost, getPosts } from "../posts";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Gambit`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

// Estilos do corpo do artigo (sem plugin de tipografia).
const prose = [
  "space-y-5 text-lg leading-relaxed text-zinc-700",
  "[&_h2]:pt-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-900",
  "[&_h3]:pt-2 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-zinc-900",
  "[&_a]:text-zinc-900 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-zinc-600",
  "[&_strong]:font-semibold [&_strong]:text-zinc-900",
  "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-zinc-300 [&_blockquote]:pl-5 [&_blockquote]:italic",
  "[&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-base",
  "[&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-zinc-900 [&_pre]:p-5 [&_pre]:text-sm [&_pre]:text-zinc-100 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
  "[&_img]:rounded-2xl [&_img]:border [&_img]:border-zinc-200",
  "[&_hr]:border-zinc-200",
].join(" ");

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 pt-16 pb-24 sm:pt-24">
          <Link
            href="/blog"
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-900"
          >
            ← Voltar ao blog
          </Link>

          <header className="mt-8">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {post.category}
            </span>
            {post.draft && (
              <span className="ml-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                Rascunho
              </span>
            )}
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-sm text-zinc-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readingTime} de leitura · Rafael Ruggieri
            </p>
          </header>

          <div className={`mt-10 ${prose}`}>
            {Markdoc.renderers.react(post.content, React)}
          </div>

          <aside className="mt-16 rounded-2xl bg-zinc-900 p-8 text-white">
            <h2 className="font-serif text-2xl">Quer aplicar isso no seu negócio?</h2>
            <p className="mt-2 text-zinc-300">
              Conte o seu cenário e receba um caminho claro para evoluir.
            </p>
            <Link
              href="/#contato"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Falar com a Gambit
            </Link>
          </aside>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
