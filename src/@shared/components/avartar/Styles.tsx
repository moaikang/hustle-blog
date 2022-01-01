import styled from "@emotion/styled";
import Image from "next/image";

type AvatarImgProps = {
  size: number;
};

export const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const AvatarImg = styled(Image)<AvatarImgProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
