import Hr from "@shared/components/hr";
import React, { ReactElement } from "react";
import { PostData } from "src/types/post";
import Comments from "./components/comments";
import MarkdownRenderer from "./components/markdown-renderer";
import PostHead from "./components/post-head";
import { BottomProfile } from "./Styles";

type Props = {
  postData: PostData;
};

function Post({ postData }: Props): ReactElement {
  return (
    <>
      <PostHead postData={postData} />
      <MarkdownRenderer mdText={postData.text} />
      <Hr />
      <BottomProfile />
      <Comments />
    </>
  );
}

export default Post;
