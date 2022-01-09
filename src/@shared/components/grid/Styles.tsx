import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Responsive from "@shared/styles/Responsive";

export const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 0 16px;

  ${Responsive.mobile(
    css`
      width: 100%;
      padding: 0 22px;
    `
  )}
`;
