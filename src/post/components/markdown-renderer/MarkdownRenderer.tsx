import React, { ReactElement } from "react";
import root from "react-shadow";
import ReactMarkdown from "react-markdown";
import * as S from "./Styles";

type Props = {
  mdText: string;
};

const markdownPlugInProps = {};

function MarkdownRenderer({ mdText }: Props): ReactElement {
  return (
    <root.div mode="closed">
      <S.Wrapper>
        <ReactMarkdown>{mdText}</ReactMarkdown>
      </S.Wrapper>
    </root.div>
  );
}

export default MarkdownRenderer;
