import "../styles/globals.scss";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useCursor from "../components/Resolvers/States/Cursor";
import { useRouter } from "next/router";
import Logo from 'assets/svg/HDSHT_HD.svg';

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    console.log("App comp mounted", Component, pageProps);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log(`App is changing to ${url}`);
      useCursor.setState({ cursorVariant: "default" });
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    isMounted && (
      <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
        {/* <div style={{backgroundColor: "black"}}><img src="/assets/svg/logo-symbol.svg"/></div> */}
      
        <div className="body">
        <PrismicPreview repositoryName={repositoryName}>
          <AnimatePresence>
            <Component {...pageProps} />
          </AnimatePresence>
        </PrismicPreview>

        <section>
          <img src={Logo.src} alt="logo" style={{width: "calc(100% - 6rem)", margin: "3rem"}}/>
        </section>
        </div>

      </PrismicProvider>
    )
  );
}
