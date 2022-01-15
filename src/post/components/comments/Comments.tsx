import React, { ReactElement } from "react";
import * as S from "./Styles";

const UTTERANCE_CONFIG = {
  src: "https://utteranc.es/client.js",
  repo: "moaikang/hustle-blog",
  "issue-term": "pathname",
  label: "Comment",
  theme: "github-light",
  crossOrigin: "anonymous",
  async: "true",
};

function Comments(): ReactElement {
  const commentRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!commentRef.current) return;

    const utteranceScriptEl = document.createElement("script");

    Object.entries(UTTERANCE_CONFIG).forEach(([key, value]) => {
      utteranceScriptEl.setAttribute(key, value);
    });

    commentRef.current.appendChild(utteranceScriptEl);
  }, []);

  return <S.Wrapper ref={commentRef}></S.Wrapper>;
}

export default Comments;
