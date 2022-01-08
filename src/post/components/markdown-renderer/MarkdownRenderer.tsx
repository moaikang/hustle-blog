import React, { ReactElement } from "react";
import root from "react-shadow";
import ReactMarkdown from "react-markdown";

type Props = {};

const markdownPlugInProps = {};

function MarkdownRenderer({}: Props): ReactElement {
  return (
    <root.div mode="closed">
      <ReactMarkdown># 안녕</ReactMarkdown>
    </root.div>
  );
}

export default MarkdownRenderer;
