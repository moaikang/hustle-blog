import useCategoryQuery from "@home/hooks/useCategoryQuery";
import useFetchSummary from "@home/hooks/useFetchSummary";
import React, { ReactElement } from "react";
import PostItem from "./components/post-item";
import * as S from "./Styles";

function PostList(): ReactElement {
  const { categoryQuery } = useCategoryQuery();
  const { isSummariesLoading, summaries, error } = useFetchSummary(
    categoryQuery || "All"
  );

  if (isSummariesLoading) {
    return <div></div>;
  }

  return (
    <S.Wrapper>
      {summaries &&
        summaries.map((post, idx) => <PostItem post={post} key={idx} />)}
    </S.Wrapper>
  );
}

export default PostList;
