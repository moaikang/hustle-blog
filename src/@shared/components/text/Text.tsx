/* eslint-disable react/display-name */
import Palette from "@shared/styles/Palette";
import * as S from "./Styles";
import React, { ReactChild, ReactElement } from "react";

export type OwnProps = {
  decorate?: {
    textColor?: string;
    fontWeight?: "thin" | "regular" | "bold" | "extra-bold";
    fontSize?: number;
    underline?: boolean;
  };
};

export type Props = OwnProps & {
  as?: React.ElementType<any>;
  className?: string;
  children: ReactChild;
} & React.HTMLAttributes<HTMLElement>;

type NullablePropertyDecorate = NonNullable<Props["decorate"]>;
export type NonNullableDecorate = {
  [T in keyof NullablePropertyDecorate]-?: NullablePropertyDecorate[T];
};

const defaultDecorateTemplate: NonNullableDecorate = {
  textColor: Palette.BLACK,
  fontWeight: "regular",
  fontSize: 12,
  underline: false,
};

const Text = React.forwardRef(
  ({ decorate, children, as, className, ...restProps }: Props, ref) => {
    const defaultDecorate = decorate
      ? {
          textColor: decorate.textColor ?? Palette.BLACK,
          fontWeight: decorate.fontWeight ?? "regular",
          fontSize: decorate.fontSize ?? 12,
          underline: decorate.underline ?? false,
        }
      : defaultDecorateTemplate;

    return (
      <S.Text
        decorate={defaultDecorate}
        as={as ?? "span"}
        className={className}
        {...restProps}
      >
        {children}
      </S.Text>
    );
  }
);

export default Text;
