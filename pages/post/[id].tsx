import type { GetStaticPropsContext, NextPage } from "next";
import Post from "@post/Post";
import {
  buildCategoryPostMetaDataMap,
  getPostById,
} from "@shared/helpers/PostHandler";
import { PostData } from "src/types/post";

type UrlQuery = {
  id: string;
};

type StaticProps = {
  postData: PostData;
};

const ALL_CATEGORY = "All";

const PostPage: NextPage<StaticProps> = ({ postData }) => {
  return <Post postData={postData} />;
};

export async function getStaticProps(context: GetStaticPropsContext<UrlQuery>) {
  const { params } = context;

  if (!params) {
    throw new Error(
      "There is no params property in post/[id].tsx getStaticProps' argument context."
    );
  }

  const postData = getPostById(params.id);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const categoryPostsMap = buildCategoryPostMetaDataMap();
  const paths = categoryPostsMap[ALL_CATEGORY].map((postMetaData) => ({
    params: { id: postMetaData.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default PostPage;
