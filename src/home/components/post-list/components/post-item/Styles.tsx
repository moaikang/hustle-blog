import styled from "@emotion/styled";

export const Wrapper = styled.li`
  margin-bottom: 8px;
  border-radius: 4px;
  padding: 24px 20px 24px 20px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.08);
  }
`;

export const AnchorTag = styled.a`
  text-decoration: none;
`;

export const Content = styled.section``;

export const Title = styled.div`
  margin-bottom: 18px;
`;

export const Description = styled.p`
  margin-bottom: 24px;
`;

export const TagWrapper = styled.ul`
  display: flex;

  & > * {
    margin-right: 6px;
  }
`;
