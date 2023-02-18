import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

function handler(req: Request) {
  const redirectDomain = Deno.env.get("REDIRECT_DOMAIN") || "example.com";
  const requestUrl = new URL(req.url);
  const newUrl =
    `https://${redirectDomain}${requestUrl.pathname}${requestUrl.search}`;
  return Response.redirect(newUrl, 307);
}

serve(handler);
