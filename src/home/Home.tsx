import React, { ReactElement } from "react";
import Profile from "@home/components/profile";
import Category from "@home/components/category";
import PostList from "./components/post-list";
import { buildCategoryPostsMap } from "./utils/PostHandler";

type Props = {
  categories: string[];
  categoryPostsMap: ReturnType<typeof buildCategoryPostsMap>;
};

function Home(props: Props): ReactElement {
  const { categories, categoryPostsMap } = props;

  return (
    <>
      <Profile />
      <Category categories={categories} />
      <PostList categoryPostsMap={categoryPostsMap} />
    </>
  );
}
export default Home;
