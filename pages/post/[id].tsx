import type { GetStaticPropsContext, NextPage } from "next";
import Post from "@post/Post";
import {
  buildCategoryPostMetaDataMap,
  getPostById,
} from "@shared/helpers/PostHandler";
import { PostData } from "src/types/post";
import Head from "next/head";
import Meta from "@shared/components/meta";
import { ALL_CATEGORY } from "@shared/constants/Category";

type UrlQuery = {
  id: string;
};

type StaticProps = {
  postData: PostData;
};

const PostPage: NextPage<StaticProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{`${postData.title} | moai.blog`}</title>
        <Meta />
      </Head>
      <Post postData={postData} />
    </>
  );
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
