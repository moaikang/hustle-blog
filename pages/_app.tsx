import GlobalStyle from "@shared/styles/GlobalStyle";
import { Global } from "@emotion/react";
import type { AppProps } from "next/app";
import Header from "@shared/components/header";
import Footer from "@shared/components/footer";
import ContentWrapper from "@shared/components/content-wrapper";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={GlobalStyle} />
      <Header />

      <ContentWrapper>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ContentWrapper>

      <Footer />
    </>
  );
}

export default MyApp;
