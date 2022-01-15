import styled from "@emotion/styled";
import React from "react";
import { FunctionComponent } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

const TrafficLight = styled.div`
  width: 100%;
  height: 16px;
  background-color: rgb(30, 30, 30);
  background-image: url(https://ik.imagekit.io/garbagevalue/garbage/window-buttons_gt8xoXxWn.png);
  background-repeat: no-repeat;
  background-size: 44px 10px;
  border-radius: 12px 12px 0 0;
  background-position: 1em 1em;
  padding: 1em;
  box-sizing: border-box;
`;

const CodeBlock: FunctionComponent<Omit<CodeProps, "ref">> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const [codeBlockTheme, setCodeBlockTheme] = React.useState();
  const match = /language-(\w+)/.exec(className || "");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const {
        vscDarkPlus,
      } = require("react-syntax-highlighter/dist/esm/styles/prism");

      const theme = {
        ...vscDarkPlus,

        'pre[class*="language-"]': {
          ...vscDarkPlus['pre[class*="language-"]'],
          margin: "0",
          borderRadius: "0 0 12px 12px",
        },
      };

      setCodeBlockTheme(theme);
    }
  }, []);

  return !inline && match ? (
    <>
      <TrafficLight />
      <SyntaxHighlighter
        style={codeBlockTheme}
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
