import useCategoryQuery from "@home/hooks/useCategoryQuery";
import { buildCategoryPostsMap } from "@shared/helpers/PostHandler";
import { capitalize } from "@shared/utils/StringUtil";
import React, { ReactElement } from "react";
import PostItem from "./components/post-item";
import * as S from "./Styles";

type Props = {
  categoryPostsMap: ReturnType<typeof buildCategoryPostsMap>;
};

function PostList({ categoryPostsMap }: Props): ReactElement {
  const { categoryQuery } = useCategoryQuery();

  const category = capitalize(categoryQuery || "All");
  const posts = categoryPostsMap[category];

  return (
    <S.Wrapper>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </S.Wrapper>
  );
}

export default PostList;
