import React, { ReactElement } from "react";
import Grid from "../grid";
import * as S from "./Styles";

const TEXTS = {
  LOGO: "moai.log",
};

function Header(): ReactElement {
  return (
    <S.HeaderWrapper>
      <Grid>
        <S.LogoWrapper href="/" passHref>
          <S.LogoText>{TEXTS.LOGO}</S.LogoText>
        </S.LogoWrapper>
      </Grid>
    </S.HeaderWrapper>
  );
}

export default Header;
