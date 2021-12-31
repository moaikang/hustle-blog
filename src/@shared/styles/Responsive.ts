import { css, SerializedStyles } from "@emotion/react";

const BREAK_POINT = {
  DESKTOP: 600,
};

const desktop = (content: SerializedStyles) => css`
  @media (min-width: ${BREAK_POINT.DESKTOP}px) {
    ${content}
  }
`;

const mobile = (content: SerializedStyles) => css`
  @media (max-width: ${BREAK_POINT.DESKTOP - 1}px) {
    ${content}
  }
`;

const Responsive = {
  desktop,
  mobile,
};

export default Responsive;
