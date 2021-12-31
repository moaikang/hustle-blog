import Image from "next/image";
import React, { ReactElement } from "react";
import * as S from "./Styles";

type Props = {
  src: string;
  size: number;
} & React.HTMLAttributes<HTMLImageElement>;

function Avatar({ src, size }: Props): ReactElement {
  return (
    <S.Wrapper>
      <Image src={src} width={size} height={size} alt="avatar" />
    </S.Wrapper>
  );
}

export default Avatar;
