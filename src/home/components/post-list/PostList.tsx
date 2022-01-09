import useCategoryQuery from "@home/hooks/useCategoryQuery";
import {
  buildCategoryPostMetaDataMap,
  CategoryPostMetaDataMap,
} from "@shared/helpers/PostHandler";
import { capitalize } from "@shared/utils/StringUtil";
import React, { ReactElement } from "react";
import PostItem from "./components/post-item";
import * as S from "./Styles";

type Props = {
  categoryPostMetaDataMap: CategoryPostMetaDataMap;
};

function PostList({ categoryPostMetaDataMap }: Props): ReactElement {
  const { categoryQuery } = useCategoryQuery();

  const category = capitalize(categoryQuery || "All");
  const postMetaData = categoryPostMetaDataMap[category];

  return (
    <S.Wrapper>
      {postMetaData.map((postData) => (
        <PostItem post={postData} key={postData.id} />
      ))}
    </S.Wrapper>
  );
}

export default PostList;
