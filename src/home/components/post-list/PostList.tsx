import React, { ReactElement } from "react";
import PostItem from "./components/post-item";
import * as S from "./Styles";

type Props = {};

export type Post = {
  title: string;
  description: string;
  tags: string[];
};

const DUMMY_POST: Post = {
  title: "근우는 짱 멋진 개발자",
  description: "근우가 짱 멋진 개발자인 이유를 공유합니다.",
  tags: ["Front-end", "React"],
};

function PostList({}: Props): ReactElement {
  const posts: Post[] = new Array(10).fill(Object.assign({}, DUMMY_POST));

  return (
    <S.Wrapper>
      {posts.map((post, idx) => (
        <PostItem post={post} key={idx} />
      ))}
    </S.Wrapper>
  );
}

export default PostList;
