import { ALL_CATEGORY } from "@shared/constants/Category";
import { useRouter } from "next/router";

function useCategoryQuery() {
  const {
    query: { category },
  } = useRouter();

  const isCategorySelected = (categoryStr: string): boolean => {
    const lowerCaseCategory = categoryStr.toLowerCase();

    if (lowerCaseCategory === ALL_CATEGORY.toLowerCase() && !category) {
      return true;
    }

    if (lowerCaseCategory === category) {
      return true;
    }

    return false;
  };

  return {
    categoryQuery: category as string | undefined,
    isCategorySelected,
  };
}

export default useCategoryQuery;
