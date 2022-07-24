import React from "react";
import { FunctionComponent } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";

import * as S from "./Styles";

const BlockQuote: FunctionComponent<Omit<CodeProps, "ref">> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  return (
    <S.DefaultBlockQuoteTag className={className} {...props}>
      {children}
    </S.DefaultBlockQuoteTag>
  );
};

export default BlockQuote;
