import React, { ReactChild, ReactElement } from "react";
import Image from "next/image";
import * as S from "./Styles";
import Link from "next/link";

type ListProps = {
  children: ReactChild;
};

function List({ children }: ListProps): ReactElement {
  return <S.List>{children}</S.List>;
}

type ItemProps = {
  href: string;
  src: string;
  alt: string;
};

const ITEM_SIZE = {
  width: 20,
  height: 20,
};

function Item({ href, src, alt }: ItemProps): ReactElement {
  return (
    <S.Wrapper>
      <Link href={href} passHref>
        <a>
          <Image
            src={src}
            alt={alt}
            width={ITEM_SIZE.width}
            height={ITEM_SIZE.height}
          />
        </a>
      </Link>
    </S.Wrapper>
  );
}

const SNS = {
  List,
  Item,
};

export default SNS;
