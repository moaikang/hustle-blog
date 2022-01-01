import { GetSummaryResponse } from "@pages/api/summary";
import Api from "./Api";

const getSummariesByCategory = async (
  category: string
): Promise<NonNullable<GetSummaryResponse["data"]>> => {
  const result = await Api.get<GetSummaryResponse>(
    `/summary/?category=${category}`
  );

  if (result.status === 200) {
    return result.data.data!;
  } else {
    throw new Error("getSummaries Error");
  }
};

const SummaryApi = {
  getSummariesByCategory,
};

export default SummaryApi;
