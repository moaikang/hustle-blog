import React, { ReactChild, ReactElement } from "react";
import * as S from "./Styles";

type Props = {
  children: ReactChild;
};

function Grid({ children }: Props): ReactElement {
  return <S.Wrapper>{children}</S.Wrapper>;
}

export default Grid;
