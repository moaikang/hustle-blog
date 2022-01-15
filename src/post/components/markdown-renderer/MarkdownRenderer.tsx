import React, { ReactElement } from "react";
import root from "react-shadow/emotion";
import ReactMarkdown from "react-markdown";
import * as S from "./Styles";
import renderers from "./renderers";
import remarkGfm from "remark-gfm";

type Props = {
  mdText: string;
};

function MarkdownRenderer({ mdText }: Props): ReactElement {
  return (
    <root.div mode="closed">
      <S.Wrapper>
        <ReactMarkdown components={renderers} remarkPlugins={[remarkGfm]}>
          {mdText}
        </ReactMarkdown>
      </S.Wrapper>
    </root.div>
  );
}

export default MarkdownRenderer;
