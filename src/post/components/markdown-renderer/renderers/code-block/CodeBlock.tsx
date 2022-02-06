import React from "react";
import { FunctionComponent } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import * as S from "./Styles";
import useBuildCodeBlockTheme from "./hooks/useBuildCodeBlockTheme";

const CodeBlock: FunctionComponent<Omit<CodeProps, "ref">> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const { theme } = useBuildCodeBlockTheme();

  const renderCodeTag = () => {
    const isCodeBlock = !inline && match;

    if (isCodeBlock)
      return (
        <>
          <S.TrafficLight />
          <SyntaxHighlighter
            style={theme}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </>
      );

    return (
      <S.DefaultCodeTag className={className} {...props}>
        {children}
      </S.DefaultCodeTag>
    );
  };

  return renderCodeTag();
};

export default CodeBlock;
