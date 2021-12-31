import Tag from "@shared/components/tag";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";
import React, { ReactElement } from "react";
import { Post } from "../../PostList";
import * as S from "./Styles";

type Props = {
  post: Post;
};

function PostItem({ post }: Props): ReactElement {
  return (
    <S.Wrapper>
      <S.Content>
        <S.Title>
          <Text decorate={{ fontSize: 24, fontWeight: "extra-bold" }} as="h1">
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
          {post.tags.map((tag, idx) => (
            <Tag key={idx}>{tag}</Tag>
          ))}
        </S.TagWrapper>
      </S.Content>
    </S.Wrapper>
  );
}

export default PostItem;
