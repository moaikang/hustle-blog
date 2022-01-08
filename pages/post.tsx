import type { NextPage } from "next";
import Post from "@post/Post";
import { buildCategoryPostsMap } from "@home/utils/PostHandler";

const PostPage: NextPage = () => {
  return <Post />;
};

export async function getStaticProps() {
  const allPostsData = buildCategoryPostsMap();

  return {
    props: {
      allPostsData,
    },
  };
}

export default PostPage;
