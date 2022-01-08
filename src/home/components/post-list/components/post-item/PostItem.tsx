import Tag from "@shared/components/tag";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";
import Link from "next/link";
import React, { ReactElement } from "react";
import * as S from "./Styles";

type Props = {
  post: any;
};

function PostItem({ post }: Props): ReactElement {
  return (
    <S.Wrapper>
      <Link href={`/post/${post.id}`} passHref>
        <S.AnchorTag>
          <S.Content>
            <S.Title>
              <Text
                decorate={{ fontSize: 24, fontWeight: "extra-bold" }}
                as="h1"
              >
                {post.title}
              </Text>
            </S.Title>

            <S.Description>
              <Text
                decorate={{
                  fontSize: 15,
                  fontWeight: "thin",
                  textColor: Palette.GREY,
                }}
              >
                {post.description}
              </Text>
            </S.Description>

            <S.TagWrapper>
              <Tag>{post.category}</Tag>
            </S.TagWrapper>
          </S.Content>
        </S.AnchorTag>
      </Link>
    </S.Wrapper>
  );
}

export default PostItem;
