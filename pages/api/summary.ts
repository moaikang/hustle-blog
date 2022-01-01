import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export type SummaryData = {
  id: number;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

export type GetSummaryResponse = {
  status: string;
  data: null | SummaryData[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSummaryResponse>
) {
  const isGetMethod = req.method === "GET";

  if (!isGetMethod) {
    return res.status(404).json({ status: "Not found", data: null });
  }

  const { query } = req;
  const category = (query.category as string).toLowerCase();

  const actualDirNames = fs.readdirSync("./posts");
  const dirNames = ["All", ...actualDirNames];

  const targetCategory = dirNames.find(
    (dirName) => dirName.toLowerCase() === category
  );

  if (!targetCategory) {
    return res.status(404).json({ status: "Not found", data: null });
  }

  if (category === "all") {
    let acc: SummaryData[] = [];
    for (const dirName of actualDirNames) {
      const summaries = getSummariesInTargetCategory(dirName);
      acc = [...acc, ...summaries];
    }

    return res.status(200).json({ status: "OK", data: acc });
  }

  const summaries = getSummariesInTargetCategory(targetCategory);
  return res.status(200).json({ status: "OK", data: summaries });
}

function getSummariesInTargetCategory(targetCategory: string): SummaryData[] {
  const targetCategoryFolders = fs.readdirSync(`./posts/${targetCategory}`);

  return targetCategoryFolders.reduce((acc, targetCategoryFolder) => {
    const metaFile = fs.readFileSync(
      `./posts/${targetCategory}/${targetCategoryFolder}/meta.json`,
      "utf-8"
    );

    return [...acc, JSON.parse(metaFile)];
  }, [] as SummaryData[]);
}
