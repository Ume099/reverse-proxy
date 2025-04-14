import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// chatへのProxy
app.get("/chat/*", async (c) => {
  const url = c.req.path.replace("/chat", "") || "/";
  const res = await fetch(`http://localhost:3001${url}`);
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// officeへのProxy
app.get("/office/*", async (c) => {
  const url = c.req.path.replace("/office", "") || "/";
  const res = await fetch(`http://localhost:3002${url}`);
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// staticファイルもproxyする
// app.get("/_next/*", async (c) => {
//   const url = c.req.path;
//   const res = await fetch(`http://localhost:3002${url}`); // officeのstatic
//   const body = await res.arrayBuffer();
//   const contentType =
//     res.headers.get("content-type") || "application/octet-stream";
//   return c.body(new Uint8Array(body), 200, { "content-type": contentType });
// });

serve({ fetch: app.fetch, port: 2999 });
