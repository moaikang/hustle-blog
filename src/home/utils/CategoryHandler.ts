import { capitalize } from "@shared/utils/StringUtil";
import fs from "fs";
import path from "path";

const POSTS_DIRECTORIES = path.join(process.cwd(), "posts");

const ALL_CATEGORY = "All";
const ETC_CATEGORY = "Etc";

// DO NOT USE THIS MODULE IN CLIENT_SIDE;
export function parseCategories(): string[] {
  const categories = fs.readdirSync(POSTS_DIRECTORIES);
  return [ALL_CATEGORY, ...categories];
}

export function sortCategories(categories: string[]): string[] {
  return categories.sort((prev, next) => {
    if (prev === ALL_CATEGORY) return 1;
    if (next === ETC_CATEGORY) return -1;

    return Number(prev) - Number(next);
  });
}

export function capitalizeCategories(categories: string[]): string[] {
  return categories.map(capitalize);
}
