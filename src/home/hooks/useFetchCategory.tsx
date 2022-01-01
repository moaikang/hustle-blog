import CategoryApi from "@shared/apis/CategoryApi";
import { useQuery } from "react-query";

function useFetchCategory() {
  const { data, isLoading, error } = useQuery(
    "categories",
    CategoryApi.getCategories
  );

  return {
    categories: data,
    isCategoriesLoading: isLoading,
    error,
  };
}

export default useFetchCategory;
