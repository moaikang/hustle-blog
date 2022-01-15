import styled from "@emotion/styled";
import { fontDeclaration } from "@shared/styles/GlobalStyle";

export const Wrapper = styled.section`
  width: 100%;
  ${fontDeclaration}
  font-family: "Pretendard-Regular";
  font-size: 15px;
  line-height: 1.5rem;

  & img {
    width: 100%;
    max-width: 100%;
    width: inherit;
  }

  & pre {
    max-width: 100%;
    width: inherit;
  }

  & code {
    max-width: 100%;
    width: inherit;
    overflow: scroll;
  }
`;
