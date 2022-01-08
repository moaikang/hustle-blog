import GlobalStyle from "@shared/styles/GlobalStyle";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Header from "@shared/components/header";
import Footer from "@shared/components/footer";
import ContentWrapper from "@shared/components/content-wrapper";

function MyApp({ Component, pageProps }: AppProps) {
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
