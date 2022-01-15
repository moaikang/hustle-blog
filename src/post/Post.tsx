import React, { ReactElement } from "react";
import { PostData } from "src/types/post";
import Comments from "./components/comments";
import MarkdownRenderer from "./components/markdown-renderer";

type Props = {
  postData: PostData;
};

function Post({ postData }: Props): ReactElement {
  return (
    <>
      <MarkdownRenderer mdText={postData.text} />
      <Comments />
    </>
  );
}

export default Post;
