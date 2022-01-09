import type { GetStaticPropsResult, NextPage } from "next";
import Home from "@home/Home";
import {
  parseCategories,
  capitalizeCategories,
  sortCategories,
} from "@shared/helpers//CategoryHandler";
import {
  buildCategoryPostMetaDataMap,
  CategoryPostMetaDataMap,
} from "@shared/helpers/PostHandler";

type StaticProps = {
  categories: string[];
  categoryPostMetaDataMap: CategoryPostMetaDataMap;
};

const MainPage: NextPage<StaticProps> = ({
  categories,
  categoryPostMetaDataMap,
}) => {
  return (
    <Home
      categories={categories}
      categoryPostMetaDataMap={categoryPostMetaDataMap}
    />
  );
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<StaticProps>
> {
  const categories = parseCategories();
  const capitalizedCategories = capitalizeCategories(categories);
  const sortedCategories = sortCategories(capitalizedCategories);

  const categoryPostMetaDataMap = buildCategoryPostMetaDataMap();

  return {
    props: {
      categories: sortedCategories,
      categoryPostMetaDataMap,
    },
  };
}

export default MainPage;
