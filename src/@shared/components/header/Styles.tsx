import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bigFont } from "@shared/styles/Font";
import Palette from "@shared/styles/Palette";
import Responsive from "@shared/styles/Responsive";
import Link from "next/link";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 59px;

  ${Responsive.mobile(
    css`
      height: 40px;
    `
  )}
`;

export const LogoWrapper = styled(Link)``;

export const LogoText = styled.a`
  text-decoration: none;
  font-size: 18px;
  ${bigFont}
  color: ${Palette.BLACK};

  &:visited,
  &:link,
  &:active {
    color: ${Palette.BLACK};
  }

  &::hover {
    color: ${Palette.YELLOW};
  }
`;
