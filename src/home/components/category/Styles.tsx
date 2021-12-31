import styled from "@emotion/styled";

export const Wrapper = styled.nav`
  margin-top: 50px;
`;

export const CategoryList = styled.ul`
  overflow-x: scroll;
  display: flex;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryItem = styled.li`
  margin-right: 24px;
  white-space: nowrap;
  cursor: pointer;
`;
