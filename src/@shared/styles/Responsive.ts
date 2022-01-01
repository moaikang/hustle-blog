import { css, SerializedStyles } from "@emotion/react";

const BREAK_POINT = {
  DESKTOP: 600,
  MOBILE: 420,
};

const desktop = (content: SerializedStyles) => css`
  @media (min-width: ${BREAK_POINT.DESKTOP}px) {
    ${content}
  }
`;

const tablet = (content: SerializedStyles) => css`
  @media (min-width: ${BREAK_POINT.MOBILE +
    1}px) and (max-width: ${BREAK_POINT.DESKTOP - 1}px) {
    ${content}
  }
`;

const mobile = (content: SerializedStyles) => css`
  @media (max-width: ${BREAK_POINT.MOBILE}px) {
    ${content}
  }
`;

const Responsive = {
  desktop,
  mobile,
  tablet,
};

export default Responsive;
