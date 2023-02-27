import "../styles/globals.css";
import "./components/Calendar";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Header />

      <Component {...pageProps} />

      <Footer />
   
  


      </QueryClientProvider>
    </>
  );
}

export default MyApp;
