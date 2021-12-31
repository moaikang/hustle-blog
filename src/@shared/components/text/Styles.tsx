import styled from "@emotion/styled";
import { NonNullableDecorate } from "./Text";

type TextProps = {
  decorate: NonNullableDecorate;
};

const thin = `
  font-family: Pretendard-Light, sans-serif;
`;

const regular = `
  font-family: Pretendard-Regular, sans-serif;
`;

const bold = `
  font-family: Pretendard-Bold, sans-serif;
`;

const extraBold = `
  font-family: Pretendard-ExtraBold, sans-serif;
`;

const none = ``;

const boldStyleMap = {
  thin,
  regular,
  bold,
  extraBold,
  none,
};

export const Text = styled.span<TextProps>`
  ${(props) => {
    const {
      decorate: { textColor, fontSize, fontWeight, underline },
    } = props;

    return `
      color: ${textColor};
      font-size: ${fontSize}px;
      ${fontWeight === "thin" ? boldStyleMap.thin : boldStyleMap.none}
      ${fontWeight === "regular" ? boldStyleMap.regular : boldStyleMap.none}
      ${fontWeight === "bold" ? boldStyleMap.bold : boldStyleMap.none};
      ${
        fontWeight === "extra-bold" ? boldStyleMap.extraBold : boldStyleMap.none
      }
      text-decoration: ${underline ? "underline" : "none"};
    `;
  }}
`;
