export type PostMetaData = {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
};

export type PostData = {
  text: string;
} & PostMetaData;
