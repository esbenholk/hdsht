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
import PixelCanvas from "../components/Resolvers/pixelCanvas";
import ParticleCanvas from "@/components/Resolvers/_particleCanvas";
import useWindowDimensions from "../components/Resolvers/UseWindowDimensions";

export default function App({ Component, pageProps }) {
  const [isMounted, setIsMounted] = useState(false);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState();


  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
    setIsMobile(mobile);

    console.log("App comp mounted", Component, pageProps);
    if(pageProps.page.data && pageProps.page.data.description){
      setDesc(pageProps.page.data.description);
    }
    if(pageProps.page.data && pageProps.page.data.title){
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
        {/* <div className="body"> */}
            <PrismicPreview repositoryName={repositoryName}>
              <AnimatePresence>
                <Component {...pageProps} />
              </AnimatePresence>
            </PrismicPreview>

         
            <section 
            
              onMouseOver={() => {
                if(!router.asPath.includes("work")){
                  useCursor.setState({
                    cursorVariant: "logo",
                    isOverProject: true,
                    title: title,
                    description: desc
                  });
                } else {
                  useCursor.setState({
                    cursorVariant: "hoveronlink",
                    isOverProject: true,
                    title: "visit the frontpage",
                    description: "/"
                  });
                } 
                }}
                onClick={()=>{
                  if(router.asPath.includes("work")){
                    window.location.href = "/";  
                  }
                }}
                onMouseLeave={() => {
                  useCursor.setState({
                    cursorVariant: "default",
                    isOverProject: false,
                    title: "",
                    description: ""

                  });
                }}>
                   {/* <PixelCanvas imageUrl={Logo.src} isPageTop={false}/> */}
                   {/* <ParticleCanvas imageUrl={Logo.src} isPageTop={false}/> */}

            {isMobile ?  <img className="logo"src={Logo.src} alt="logo" style={{width: "calc(100% - 2rem)", margin: "1rem"}}/> :<ParticleCanvas  imageUrl={Logo.src} isPageTop={false}/>}
          </section>
        {/* </div> */}


      </PrismicProvider>
    )
  );
}
