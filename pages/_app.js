import "../styles/globals.scss";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useCursor from "../components/Resolvers/States/Cursor";
import { useRouter } from "next/router";


export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {

      useCursor.setState({ cursorVariant: "default", url: url });
    };
    useCursor.setState({ cursorVariant: "default", url: router.asPath });
    router.events.on("routeChangeStart", handleRouteChange);
    
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  return (
    isMounted && (
      <PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>      
            
            <PrismicPreview repositoryName={repositoryName}>
              <AnimatePresence>
                <Component {...pageProps} />
              </AnimatePresence>
            </PrismicPreview>




      </PrismicProvider>
    )
  );
}

