import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import redirect from "./redirect.ts";

Deno.test("redirects", async (t) => {
  const initialRedirectDomain = Deno.env.get("REDIRECT_DOMAIN");
  Deno.env.set("REDIRECT_DOMAIN", "example123.com");

  const testCases = [
    ["http://other.com", "https://example123.com/"],
    ["http://other.com/document123", "https://example123.com/document123"],
    ["http://other.com/document123/", "https://example123.com/document123/"],
    [
      "http://other.com/document123/?foo=bar&1=2",
      "https://example123.com/document123/?foo=bar&1=2",
    ],
    [
      "http://other.com/document123/another_path/etc",
      "https://example123.com/document123/another_path/etc",
    ],
  ];
  await Promise.all(
    testCases.map(([url, expected]) =>
      t.step({
        name: `redirect ${url} -> ${expected}`,
        fn: () => {
          const resp = redirect(new Request(new URL(url)));
          assertEquals(resp.headers.get("location"), expected);
        },
        sanitizeOps: false,
        sanitizeResources: false,
        sanitizeExit: false,
      })
    ),
  );

  // Cleanup env after tests
  Deno.env.set("REDIRECT_DOMAIN", initialRedirectDomain || "");
});
