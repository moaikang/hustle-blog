import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Responsive from "@shared/styles/Responsive";

export const Wrapper = styled.section`
  margin-top: 32px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  transform: translateX(-2px);
`;

export const AboutWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  & > .name {
    margin-bottom: 6px;
  }

  ${Responsive.mobile(css`
    margin-left: 20px;
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
