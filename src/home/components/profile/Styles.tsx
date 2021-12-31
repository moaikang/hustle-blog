import styled from "@emotion/styled";

export const Wrapper = styled.section`
  margin-top: 32px;
`;

export const Content = styled.div`
  display: flex;
  transform: translateX(-2px);
`;

export const AboutWrapper = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  & > .name {
    margin-bottom: 6px;
  }
`;

export const ContactWrapper = styled.address`
  display: flex;
  margin-top: 16px;

  & > .contact-label {
    margin-right: 8px;
  }
`;
