import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Responsive from "@shared/styles/Responsive";

export const Wrapper = styled.li`
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 24px 20px 24px 20px;
  cursor: pointer;
  width: calc(100% + 40px);
  transform: translateX(-24px);

  ${Responsive.mobile(
    css`
      padding: 24px 0;

      &:hover {
        box-shadow: none;
      }
    `
  )}

  ${Responsive.desktop(css`
    &:hover {
      box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
    }
  `)}

  -webkit-tap-highlight-color: transparent;
`;

export const AnchorTag = styled.a`
  text-decoration: none;
`;

export const Content = styled.section``;

export const Title = styled.div`
  margin-bottom: 4px;
  line-height: 32px;
`;

export const Description = styled.p`
  margin-bottom: 20px;
  line-height: 24px;
`;

export const TagWrapper = styled.ul`
  display: flex;

  & > * {
    margin-right: 6px;
  }
`;
