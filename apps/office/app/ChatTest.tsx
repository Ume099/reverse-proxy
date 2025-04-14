"use client";

import { useEffect } from "react";

export const ChatTest = () => {
  useEffect(() => {
    const loadHtml = async () => {
      const res = await fetch("http://localhost:2999/chat/");
      const text = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const main = doc.getElementById("test");
      const linkTags = doc.head.querySelectorAll('link[rel="stylesheet"]');

      const target = document.getElementById("remote-content");

      // linkタグ (CSS) を head に追加（重複防止 + href補完）
      linkTags.forEach((tag) => {
        const href = tag.getAttribute("href");
        if (!href) return;

        const fullHref = href.startsWith("http")
          ? href
          : href.startsWith("/_next/")
            ? `http://localhost:2999/chat${href}`
            : `http://localhost:2999${href}`;

        const exists = [...document.head.querySelectorAll("link")].some(
          (el) => el.href === fullHref
        );

        if (!exists) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = fullHref;
          document.head.appendChild(link);
        }
      });

      if (main && target) {
        console.log("✅ innerHTML to inject:", main.innerHTML);
        target.innerHTML = "";
        target.appendChild(main.cloneNode(true));
      }
    };

    loadHtml();
  }, []);

  return <div id="remote-content" />;
};
