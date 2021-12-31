import styled from "@emotion/styled";
import Palette from "@shared/styles/Palette";

export const FooterWrapper = styled.footer`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 92px;
  background-color: ${Palette.LIGHT_GREY};
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
`;
