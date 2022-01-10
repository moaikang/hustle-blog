import GlobalStyle from "@shared/styles/GlobalStyle";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Header from "@shared/components/header";
import Footer from "@shared/components/footer";
import ContentWrapper from "@shared/components/content-wrapper";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    window.alert("블로그 공사 중 입니다. 미흡하더라도 양해 부탁드려요 :)");
  }, []);

  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />

      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MyApp;
