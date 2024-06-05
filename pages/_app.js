import "../styles/globals.scss";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import useCursor from "../components/Resolvers/States/Cursor";
import { useRouter } from "next/router";


export default function App({ Component, pageProps, page }) {
  const [isMounted, setIsMounted] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState();


  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsMobile(mobile);

    console.log("App comp mounted", page);
    if(pageProps.page && pageProps.page.data && pageProps.page.data.description){
      setDesc(pageProps.page.data.description);
    }
    if(pageProps.page && pageProps.page.data && pageProps.page.data.title){
      setTitle(pageProps.page.data.title);
    }
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

