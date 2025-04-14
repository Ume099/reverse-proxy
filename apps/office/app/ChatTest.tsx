"use client";

import { useEffect, useState } from "react";

export const ChatTest = () => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("/embed/chat/test")
      .then((res) => res.text())
      .then(setHtml);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};
