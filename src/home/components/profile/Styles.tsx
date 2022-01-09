import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Responsive from "@shared/styles/Responsive";

export const Wrapper = styled.section`
  margin-top: 32px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(-1px);

  ${Responsive.mobile(
    css`
      flex-direction: column;
      align-items: normal;
    `
  )}
`;

export const AboutWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  & > .name {
    margin-bottom: 6px;
    line-height: 22px;
  }

  ${Responsive.mobile(css`
    margin-top: 20px;
    margin-left: 0;
  `)}
`;

export const ContactWrapper = styled.address`
  display: flex;
  margin-top: 16px;

  & > .contact-label {
    margin-right: 8px;
  }

  ${Responsive.mobile(css`
    flex-direction: column;

    & > .contact-label {
      margin-bottom: 6px;
    }
  `)}
`;
