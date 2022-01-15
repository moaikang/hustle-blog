import React from "react";
import { FunctionComponent } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";

const CodeBlock: FunctionComponent<Omit<CodeProps, "ref">> = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  const [style, setStyle] = React.useState();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const {
        vscDarkPlus,
      } = require("react-syntax-highlighter/dist/esm/styles/prism");

      setStyle(vscDarkPlus);
    }
  }, []);

  return !inline && match ? (
    <SyntaxHighlighter
      style={style}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default CodeBlock;
