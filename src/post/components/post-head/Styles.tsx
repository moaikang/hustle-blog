import styled from "@emotion/styled";

export const Wrapper = styled.section`
  margin-top: 23px;
  display: flex;
  flex-direction: column;

  & > .category {
    letter-spacing: -0.01em;
    margin-bottom: 12px;
  }

  & > .title {
    margin-bottom: 38px;
    line-height: 42px;
  }

  & > .date {
    line-height: 11px;
    letter-spacing: -0.01em;
    color: #979797;
  }

  & > .divider {
    margin-top: 17px;
    margin-bottom: 17px;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`;
