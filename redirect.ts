export default function redirect(req: Request) {
  const redirectDomain = Deno.env.get("REDIRECT_DOMAIN") || "example.com";
  const requestUrl = new URL(req.url);
  const newUrl =
    `https://${redirectDomain}${requestUrl.pathname}${requestUrl.search}`;
  return Response.redirect(newUrl, 307);
}
