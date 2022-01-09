import React, { ReactElement } from "react";

type Props = {
  ogTitle?: string;
  ogDescription?: string;
};

function Meta({ ogTitle, ogDescription }: Props): ReactElement {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keyword"
        content="기술 블로그, TIL, 프론트엔드, 자바스크립트, 리액트, 타입스크립트, 회고"
      />
      <meta name="description" content="개발자 강근우의 기술 블로그입니다." />
      <meta name="author" content="moaikang" />
      <meta property="og:url" content="https://moai.blog" />
      <meta
        property="og:title"
        content={ogTitle ?? "개발자 강근우의 기술 블로그"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content="https://i2.ruliweb.com/img/20/12/24/1769325e6fa148aed.jpg"
      />
      <meta
        property="og:description"
        content={ogDescription ?? "나도 블로그 만들어따"}
      />
    </>
  );
}

export default Meta;
