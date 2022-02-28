import Image, { ImageProps } from "next/image";
import React, { ReactElement } from "react";
import * as S from "./Styles";

type Props = {
  src: string;
  size: number;
} & ImageProps;

function Avatar({ src, size, ...props }: Props): ReactElement {
  return (
    <S.Wrapper>
      <Image src={src} width={size} height={size} alt="avatar" {...props} />
    </S.Wrapper>
  );
}

export default Avatar;
