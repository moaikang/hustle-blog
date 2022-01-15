import React from "react";

const BASE_THEME_SELECTOR = 'pre[class*="language-"]';

function useBuildCodeBlockTheme() {
  const [theme, setTheme] = React.useState();

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const {
      vscDarkPlus: vsCodeDarkTheme,
    } = require("react-syntax-highlighter/dist/esm/styles/prism");

    const theme = {
      ...vsCodeDarkTheme,

      [BASE_THEME_SELECTOR]: {
        ...vsCodeDarkTheme[BASE_THEME_SELECTOR],
        margin: "0",
        borderRadius: "0 0 12px 12px",
      },
    };

    setTheme(theme);
  }, []);

  return { theme };
}

export default useBuildCodeBlockTheme;
