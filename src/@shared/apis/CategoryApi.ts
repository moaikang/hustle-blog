import { GetCategoryResponse } from "@pages/api/category";
import Api from "./Api";

const getCategories = async (): Promise<
  NonNullable<GetCategoryResponse["data"]>
> => {
  const result = await Api.get<GetCategoryResponse>("/category");

  if (result.status === 200) {
    return result.data.data!;
  } else {
    throw new Error("getCategories Error");
  }
};

const CategoryApi = {
  getCategories,
};

export default CategoryApi;
