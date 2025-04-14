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

app.get("/chat/_next/*", async (c) => {
  const url = c.req.path.replace("/chat", "");
  const res = await fetch(`http://localhost:3001${url}`);
  const body = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// chatの特定idを取得
app.get("/embed/chat/:id", async (c) => {
  const { id } = c.req.param();
  const res = await fetch(`http://localhost:3001/`);
  const html = await res.text();

  const match = html.match(new RegExp(`<div id="${id}">([\\s\\S]*?)<\\/div>`));
  const result = match ? match[0] : "Not Found";

  return c.html(result);
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
app.get("/_next/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3002${url}`);
  const body = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// wsもproxyする
// app.get("/_next/webpack-hmr", async (c) => {
//   return await fetch(`http://localhost:3002/_next/webpack-hmr`);
// });

serve({ fetch: app.fetch, port: 2999 });
