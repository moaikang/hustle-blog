import SummaryApi from "@shared/apis/SummaryApi";
import { useQuery } from "react-query";

function useFetchSummary(category: string = "All") {
  const { data, isLoading, error } = useQuery(`summaries-${category}}`, () =>
    SummaryApi.getSummariesByCategory(category)
  );

  console;

  return {
    summaries: data,
    isSummariesLoading: isLoading,
    error,
  };
}

export default useFetchSummary;
