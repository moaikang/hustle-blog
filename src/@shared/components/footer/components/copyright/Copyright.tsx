import React, { ReactChild, ReactElement } from "react";
import * as S from "./Styles";

type ListProps = {
  children: ReactChild;
};
function List({ children }: ListProps): ReactElement {
  return <S.List>{children}</S.List>;
}

type ItemProps = { content: ReactChild };

function Item({ content }: ItemProps): ReactElement {
  return <S.Item>{content}</S.Item>;
}

const CopyRight = {
  List,
  Item,
};

export default CopyRight;
