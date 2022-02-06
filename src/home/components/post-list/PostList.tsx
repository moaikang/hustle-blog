import useCategoryQuery from "@home/hooks/useCategoryQuery";
import { ALL_CATEGORY } from "@shared/constants/Category";
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

  const category = capitalize(categoryQuery || ALL_CATEGORY);
  const postMetaData = categoryPostMetaDataMap[category];

  return (
    <S.Wrapper role="tabpanel">
      {postMetaData.map((postData) => (
        <PostItem post={postData} key={postData.id} />
      ))}
    </S.Wrapper>
  );
}

export default PostList;
