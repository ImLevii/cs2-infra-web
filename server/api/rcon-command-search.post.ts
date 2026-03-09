import { Client } from "typesense";

export default defineEventHandler(async (event) => {
  const typesenseApiKey =
    process.env.TYPESENSE_API_KEY ||
    process.env.NUXT_TYPESENSE_API_KEY ||
    process.env.NUXT_PUBLIC_TYPESENSE_API_KEY;

  if (!typesenseApiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: "Search service is not configured (missing TYPESENSE_API_KEY)",
    });
  }

  const client = new Client({
    nodes: [
      {
        host: process.env.NUXT_PUBLIC_TYPESENSE_HOST as string,
        port: 443,
        protocol: "https",
      },
    ],
    apiKey: typesenseApiKey,
    connectionTimeoutSeconds: 2,
  });

  const body = await readBody(event);

  const results = await client
    .collections("cvars")
    .documents()
    .search({
      q: body.query?.trim() ?? "*",
      query_by: "name,description",
      sort_by: "_text_match:desc,name:asc",
      infix: ["fallback"],
    });

  return results;
});
