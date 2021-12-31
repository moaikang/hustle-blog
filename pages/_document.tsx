import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="keyword"
            content="기술 블로그, TIL, 프론트엔드, 자바스크립트, 리액트, 타입스크립트, 회고"
          />
          <meta
            name="description"
            content="개발자 강근우의 기술 블로그입니다."
          />
          <meta name="author" content="moaikang" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>moai.log</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
