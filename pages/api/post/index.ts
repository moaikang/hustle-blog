import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type CategoryData = {
  id: number;
  category: string;
};

export type GetCategoryResponse = {
  status: string;
  data: null | CategoryData[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetCategoryResponse>
) {
  const isGetMethod = req.method === "GET";

  if (!isGetMethod) {
    return res.status(404).json({ status: "Not found", data: null });
  }

  const dirNames = ["All", ...fs.readdirSync("./posts")];
  const dirs = dirNames.map((dir, idx) => ({
    id: idx,
    category: dir,
  }));

  return res.status(200).json({ status: "OK", data: dirs });
}
