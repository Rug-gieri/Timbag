import { collection, config, fields } from "@keystatic/core";

export default config({
  // Em desenvolvimento os posts são salvos direto nos arquivos locais.
  // Em produção, o Keystatic faz commit no GitHub (e o deploy publica o post).
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "github", repo: "Rug-gieri/Timbag" },
  ui: {
    brand: { name: "Gambit" },
  },
  collections: {
    posts: collection({
      label: "Artigos do blog",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        excerpt: fields.text({
          label: "Resumo",
          description: "Aparece nos cards e na descrição do Google.",
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } },
        }),
        category: fields.text({
          label: "Categoria",
          description: "Ex.: Inteligência Artificial, Automação, Presença digital.",
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Data de publicação",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "Rascunho",
          description: "Enquanto marcado, o artigo não aparece no site.",
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: "Conteúdo",
          options: {
            image: {
              directory: "public/blog",
              publicPath: "/blog/",
            },
          },
        }),
      },
    }),
  },
});
