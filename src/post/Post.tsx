import React, { ReactElement } from "react";
import { PostData } from "src/types/post";
import Comments from "./components/comments";
import MarkdownRenderer from "./components/markdown-renderer";
import { BottomProfile } from "./Styles";

type Props = {
  postData: PostData;
};

function Post({ postData }: Props): ReactElement {
  return (
    <>
      <MarkdownRenderer mdText={postData.text} />
      <hr />
      <BottomProfile />
      <Comments />
    </>
  );
}

export default Post;
