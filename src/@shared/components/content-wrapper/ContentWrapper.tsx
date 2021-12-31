import React, { ReactChild, ReactElement } from "react";
import Grid from "../grid";
import * as S from "./Styles";

type Props = {
  children: ReactChild;
};

function ContentWrapper({ children }: Props): ReactElement {
  return (
    <S.Wrapper>
      <Grid>{children}</Grid>
    </S.Wrapper>
  );
}

export default ContentWrapper;
