import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { capitalize } from "@shared/utils/StringUtil";

type PostMetaData = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

type CategoryPostsMap = {
  [category: string]: PostMetaData[];
};

const postsDirectory = path.join(process.cwd(), "posts");

export function buildCategoryPostsMap(): CategoryPostsMap {
  const directories = fs.readdirSync(postsDirectory);

  let postsMap: { [category: string]: any[] } = {};

  for (const directory of directories) {
    const directoryPath = path.join(postsDirectory, directory);

    const fileNames = fs.readdirSync(directoryPath);

    const categoryData = fileNames.map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const filePath = path.join(directoryPath, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
        date: matterResult.data.date.toString(),
      };
    });

    const sortedCategoryData = categoryData.sort(sortByDate);
    const category = capitalize(directory);

    postsMap[category] = sortedCategoryData;
  }

  postsMap.All = Object.values(postsMap)
    .reduce((allPosts, posts) => [...allPosts, ...posts], [])
    .sort(sortByDate);

  return postsMap;
}

function isDateExist(matterData: {
  [key: string]: any;
}): matterData is { date: string; [key: string]: any } {
  return "date" in matterData;
}

type Data = {
  date: any;
  id: string;
};

function sortByDate(prevData: Data, nextData: Data): number {
  if (!(isDateExist(prevData) && isDateExist(nextData))) {
    throw new Error("data should have date property");
  }

  const { date: prevDate } = prevData;
  const { date: nextDate } = nextData;

  if (prevDate < nextDate) {
    return 1;
  }

  if (prevDate > nextDate) {
    return -1;
  }

  return 0;
}
