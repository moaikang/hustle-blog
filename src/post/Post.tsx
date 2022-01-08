import React, { ReactElement } from "react";
import MarkdownRenderer from "./components/markdown-renderer";

type Props = {};

function Post({}: Props): ReactElement {
  return <MarkdownRenderer />;
}

export default Post;
