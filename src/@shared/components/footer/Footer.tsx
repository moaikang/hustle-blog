import React, { ReactElement } from "react";
import Grid from "../grid";
import * as S from "./Styles";
import LinkedInImage from "@icons/ic_linkedin.svg";
import GitHubImage from "@icons/ic_github.svg";
import SNS from "./components/SNS";
import CopyRight from "./components/copyright/Copyright";
import Text from "@shared/components/text";
import Palette from "@shared/styles/Palette";

const SNS_LINKS = {
  LINKEDIN: "https://kr.linkedin.com/in/keunwoo-kang-38b2b11ba",
  GITHUB: "https://github.com/moaikang",
};

const COPYRIGHT_TEXT = {
  MAKER: "© moaikang",
  DESIGNER: "designed by JooHyeon Lee",
};

function Footer(): ReactElement {
  return (
    <S.FooterWrapper>
      <Grid>
        <S.FooterContent>
          <CopyRight.List>
            <>
              <CopyRight.Item
                content={
                  <Text decorate={{ fontWeight: "bold" }}>
                    {COPYRIGHT_TEXT.MAKER}
                  </Text>
                }
              />
              <CopyRight.Item
                content={
                  <Text decorate={{ textColor: Palette.GREY }}>
                    {COPYRIGHT_TEXT.DESIGNER}
                  </Text>
                }
              />
            </>
          </CopyRight.List>

          <SNS.List>
            <>
              <SNS.Item
                href={SNS_LINKS.LINKEDIN}
                alt="LinkedIn"
                src={LinkedInImage}
              />
              <SNS.Item
                href={SNS_LINKS.GITHUB}
                alt="GitHub"
                src={GitHubImage}
              />
            </>
          </SNS.List>
        </S.FooterContent>
      </Grid>
    </S.FooterWrapper>
  );
}

export default Footer;
