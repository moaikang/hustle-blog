import Palette from "@shared/styles/Palette";
import React, { ReactElement, ReactChild } from "react";
import * as S from "./Styles";

type Props = {
  children: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const buildColorIdxFunc = (maxIdx: number) => {
  let idx = 0;

  return () => {
    if (idx === maxIdx - 1) {
      idx = 0;
      return idx;
    }

    return idx++;
  };
};

const getColorIdx = buildColorIdxFunc(Palette.TAG_COLORS.length);

const textTagColorMap: { [text: string]: string } = {};

function Tag(props: Props): ReactElement {
  const { children, ...rest } = props;

  if (!textTagColorMap[children]) {
    textTagColorMap[children] = Palette.TAG_COLORS[getColorIdx()];
  }

  const tagColor = textTagColorMap[children];

  return (
    <S.Tag {...rest} color={tagColor}>
      {children}
    </S.Tag>
  );
}

export default Tag;
