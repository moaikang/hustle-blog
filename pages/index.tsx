import type { GetStaticPropsResult, NextPage } from "next";
import Home from "@home/Home";
import _ from "lodash";

import {
  parseCategories,
  capitalizeCategories,
  sortCategories,
} from "@home/utils/CategoryHandler";
import { buildCategoryPostsMap } from "@home/utils/PostHandler";

type StaticProps = {
  categories: string[];
  categoryPostsMap: ReturnType<typeof buildCategoryPostsMap>;
};

const MainPage: NextPage<StaticProps> = ({ categories, categoryPostsMap }) => {
  return <Home categories={categories} categoryPostsMap={categoryPostsMap} />;
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StaticProps>
> {
  const categories = parseCategories();
  const capitalizedCategories = capitalizeCategories(categories);
  const sortedCategories = sortCategories(capitalizedCategories);

  const categoryPostsMap = buildCategoryPostsMap();

  return {
    props: {
      categories: sortedCategories,
      categoryPostsMap: categoryPostsMap,
    },
  };
}

export default MainPage;
