import Text from "@shared/components/text";
import React from "react";
import * as S from "./Styles";
import { PostData } from "src/types/post";
import { convertUnixTimeToYYYYMMDD } from "@shared/utils/DateUtil";
import Hr from "@shared/components/hr";

type Props = {
  postData: PostData;
};

function PostHead({ postData }: Props) {
  return (
    <S.Wrapper>
      <Text
        as="span"
        decorate={{ fontWeight: "thin", fontSize: 11, textColor: "#979797" }}
        className="category"
      >
        {postData.category}
      </Text>

      <Text
        as="h1"
        decorate={{
          fontWeight: "bold",
          fontSize: 34,
          textColor: "#2E2E2E",
        }}
        className="title"
      >
        {postData.title}
      </Text>

      <Text
        as="span"
        decorate={{ fontSize: 11, fontWeight: "thin", textColor: "#979797" }}
      >
        {convertUnixTimeToYYYYMMDD(Number(postData.date))}
      </Text>

      <Hr className="divider" />
    </S.Wrapper>
  );
}

export default PostHead;
