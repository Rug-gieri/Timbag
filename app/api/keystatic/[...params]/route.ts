import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Em produção o painel só é ativado quando as credenciais do GitHub App
// estão configuradas (KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET
// e KEYSTATIC_SECRET). Sem elas, a rota responde 404.
const enabled =
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );

const handler = enabled ? makeRouteHandler({ config }) : null;
const notFound = async () => new Response("Not found", { status: 404 });

export const GET: NonNullable<typeof handler>["GET"] = (...args) =>
  handler ? handler.GET(...args) : notFound();
export const POST: NonNullable<typeof handler>["POST"] = (...args) =>
  handler ? handler.POST(...args) : notFound();
