import type { GetStaticPropsContext, NextPage } from "next";
import Post from "@post/Post";
import {
  buildCategoryPostsMap,
  getPostById,
  PostData,
} from "@shared/helpers/PostHandler";

type UrlQuery = {
  id: string;
};

type StaticProps = {
  postData: PostData;
};

const PostPage: NextPage<StaticProps> = ({ postData }) => {
  return <Post postData={postData} />;
};

export async function getStaticProps(context: GetStaticPropsContext<UrlQuery>) {
  const { params } = context;

  if (!params) {
    throw new Error(
      "There is no params property in post[id] getStaticProps' argument context."
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
  const categoryPostsMap = buildCategoryPostsMap();
  const paths = categoryPostsMap["All"].map((postMetaData) => ({
    params: { id: postMetaData.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default PostPage;
