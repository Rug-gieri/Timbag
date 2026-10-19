import { createReader } from "@keystatic/core/reader";
import Markdoc from "@markdoc/markdoc";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO (YYYY-MM-DD)
};

const byNewest = (a: PostSummary, b: PostSummary) =>
  b.date.localeCompare(a.date);

// Rascunhos aparecem apenas em desenvolvimento, para pré-visualização.
const showDrafts = process.env.NODE_ENV === "development";

export async function getPosts(): Promise<PostSummary[]> {
  const entries = await reader.collections.posts.all();
  return entries
    .filter(({ entry }) => showDrafts || !entry.draft)
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      excerpt: entry.excerpt,
      category: entry.category,
      date: entry.date ?? "",
    }))
    .sort(byNewest);
}

export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug);
  if (!entry || (entry.draft && !showDrafts)) return null;

  const node = (await entry.content()).node;
  const words = countWords(node);

  return {
    slug,
    title: entry.title,
    excerpt: entry.excerpt,
    category: entry.category,
    date: entry.date ?? "",
    draft: entry.draft,
    readingTime: `${Math.max(1, Math.round(words / 200))} min`,
    content: Markdoc.transform(node),
  };
}

function countWords(node: ReturnType<typeof Markdoc.parse>) {
  let text = "";
  for (const n of node.walk()) {
    if (n.type === "text") text += ` ${n.attributes.content}`;
  }
  return text.split(/\s+/).filter(Boolean).length;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
