import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { capitalize } from "@shared/utils/StringUtil";
import { PostData, PostMetaData } from "src/types/post";

export type CategoryPostMetaDataMap = {
  [category: string]: PostMetaData[];
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostById(id: string): PostData {
  let postData: Nullable<PostData> = null;

  traverse((path, fileName) => {
    const fileId = fileName.replace(/\.md$/, "");

    if (fileId === id) {
      const fileContents = fs.readFileSync(path, "utf8");
      const matterResult = matter(fileContents);

      postData = {
        id,
        ...matterResult.data,
        date: matterResult.data.date.getTime(),
        text: matterResult.content,
      } as unknown as PostData;
    }
  });

  if (!postData) throw new Error(`There is no postId = ${id}`);

  return postData;
}

export function buildCategoryPostMetaDataMap(): CategoryPostMetaDataMap {
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
        date: matterResult.data.date.getTime(),
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

function traverse(callback: (path: string, fileName: string) => void) {
  const directories = fs.readdirSync(postsDirectory);

  for (const directory of directories) {
    const directoryPath = path.join(postsDirectory, directory);
    const fileNames = fs.readdirSync(directoryPath);

    fileNames.forEach((fileName) => {
      const filePath = path.join(directoryPath, fileName);
      callback(filePath, fileName);
    });
  }
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

  console.log(prevData, nextData);

  if (prevDate < nextDate) {
    return 1;
  }

  if (prevDate > nextDate) {
    return -1;
  }

  return 0;
}
