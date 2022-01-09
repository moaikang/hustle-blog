import React, { ReactElement } from "react";
import Profile from "@home/components/profile";
import Category from "@home/components/category";
import PostList from "./components/post-list";
import { CategoryPostMetaDataMap } from "@shared/helpers/PostHandler";

type Props = {
  categories: string[];
  categoryPostMetaDataMap: CategoryPostMetaDataMap;
};

function Home(props: Props): ReactElement {
  const { categories, categoryPostMetaDataMap } = props;

  return (
    <>
      <Profile />
      <Category categories={categories} />
      <PostList categoryPostMetaDataMap={categoryPostMetaDataMap} />
    </>
  );
}
export default Home;
