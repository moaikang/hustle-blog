import { PostData } from "@shared/helpers/PostHandler";
import React, { ReactElement } from "react";
import MarkdownRenderer from "./components/markdown-renderer";

type Props = {
  postData: PostData;
};

function Post({ postData }: Props): ReactElement {
  return <MarkdownRenderer mdText={postData.text} />;
}

export default Post;
