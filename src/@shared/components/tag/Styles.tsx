import styled from "@emotion/styled";

type TagProps = {
  color?: string;
};

export const Tag = styled.button<TagProps>`
  display: flex;
  align-items: flex-start;
  outline: none;
  border: none;
  padding: 3px 8px 5px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.color || "#333"};
`;
