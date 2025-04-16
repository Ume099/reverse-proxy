import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// calendar
app.get("/calendar/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3001${url}`);
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

app.get("/calendar/_next/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3001${url}`);
  const body = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// calendarの特定idを取得
app.get("/embed/calendar/:id", async (c) => {
  const { id } = c.req.param();
  const res = await fetch(`http://localhost:3001/`);
  const html = await res.text();

  const match = html.match(new RegExp(`<div id="${id}">([\\s\\S]*?)<\\/div>`));
  const result = match ? match[0] : "Not Found";

  return c.html(result);
});

// chat
app.get("/chat/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3002${url}`);
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

app.get("/chat/_next/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3002${url}`);
  const body = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// chatの特定idを取得
app.get("/embed/chat/:id", async (c) => {
  const { id } = c.req.param();
  const res = await fetch("http://localhost:3002/chat");
  const html = await res.text();

  const match = html.match(new RegExp(`<div id="${id}">([\\s\\S]*?)<\\/div>`));
  const result = match ? match[0] : "Not Found";

  return c.html(result);
});

app.get("/chat/_next/webpack-hmr", async (c) => {
  const res = await fetch("http://localhost:3002/chat/_next/webpack-hmr");
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/event-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// office
app.get("/office", async (c) => {
  const res = await fetch("http://localhost:3000/office");
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

app.get("/office/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3000${url}`);
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// staticファイル
app.get("/office/_next/*", async (c) => {
  const url = c.req.path;
  const res = await fetch(`http://localhost:3000${url}`);
  const body = await res.arrayBuffer();
  const contentType =
    res.headers.get("content-type") || "application/octet-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// basePath
app.get("/", async (c) => {
  const res = await fetch("http://localhost:3000/office");
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/html";
  return c.body(new Uint8Array(body), 200, {
    "content-type": contentType,
  });
});

app.get("/office/_next/webpack-hmr", async (c) => {
  const res = await fetch("http://localhost:3000/office/_next/webpack-hmr");
  const body = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "text/event-stream";
  return c.body(new Uint8Array(body), 200, { "content-type": contentType });
});

// wsもproxyする
// app.get("/_next/webpack-hmr", async (c) => {
//   return await fetch(`http://localhost:3000/_next/webpack-hmr`);
// });

serve({ fetch: app.fetch, port: 2999 });
