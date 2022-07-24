import BlockQuote from "./blockquote";
import { CodeBlock } from "./code-block";

const renderers = {
  code: CodeBlock,
  blockquote: BlockQuote,
};

export default renderers;
