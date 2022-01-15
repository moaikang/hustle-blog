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

  return !inline && match ? (
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
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
