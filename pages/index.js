import styles from "../styles/Home.module.scss";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { Navigation } from "../components/Nav/Navigation";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import useCursor from "../components/Resolvers/States/Cursor";
import dynamic from "next/dynamic";

import { useFooterOffset } from "../components/Resolvers/States/FooterOffset";
import useWindowDimensions from "../components/Resolvers/UseWindowDimensions"
import Logo from 'assets/svg/HDSHT_HD.svg';
import ParticleCanvas from "@/components/Resolvers/_particleCanvas";
import { useRouter } from "next/router";
import Loader from "@/components/Loader/Loader";

const Gizmo = dynamic(() => import("../components/Gizmo/Gizmo"), {
  ssr: false,
});

const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [foldedHeight, setFoldedHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { footerOffset } = useFooterOffset();
  const {height, width} = useWindowDimensions();
  const logoRef = useRef();
  const [headerInPosition, setHeaderInPosition] = useState(false);
  const router = useRouter();


  useEffect(() => {
    console.log("welcome to HDSHT");
    const handleScroll = () => {


      if(logoRef.current ){
        const itemOffset = logoRef.current.getBoundingClientRect().y;
        if (itemOffset < -50) {
          setLogoInPosition(true);
        } else {
          setLogoInPosition(false);
        }
      }

      let h3s = document.getElementsByTagName('h3');
      if(h3s[0]){
        let stickyPosY = h3s[0].getBoundingClientRect().y;
  
       
        if(stickyPosY<50 ){
          setHeaderInPosition(true);
        } else {
          setHeaderInPosition(false);
        }
      }

    }; 
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    // console.log("PAGE", page);
    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

    setIsDesktop(!mobile);

    let incr = 55;


    let foldedHeight_temp = 0;
    for (let index = 0; index < page.data.slices.length; index++) {
      const slice = page.data.slices[index];
      if(slice.slice_type === "sticky_header" || !mobile && slice.slice_type === "credit_footer" || slice.slice_type === "cookie_footer" ){
        foldedHeight_temp += incr;
      } 
    } 
    setFoldedHeight(foldedHeight_temp);
    setIsMounted(true);
    useCursor.setState({ cursor: "default" });

  }, [width]);


  return (
    isMounted && (
      <>
        <Head>
          <title>{page.data.title}</title>
          <meta name="description" content={page.data.description} />
          <meta name="keywords" content={page.data.keywords} />
          <meta name="author" content="HDSHT" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="UTF-8" />
        </Head>

        {isDesktop ? 
          <>
            <Gizmo />
            <Cursor />
            <Loader settings={page.settings}/>
          </>:    
            <Navigation logo={page.settings?.data.logo} links={page.settings?.data.slices[2].items} settings={page.settings}/>
        }
      
        <motion.div
          className={styles.Container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            transition: "all 5 ease",
            marginTop: isDesktop ? `calc(${height-foldedHeight}px + ${footerOffset}px)` : `calc(${height}px)`,
          }}
        >
          <SliceZone slices={page.data.slices} components={components} />

          {isDesktop && 
            <section 
              onMouseOver={() => {
                if(!router.asPath.includes("work")){
                  useCursor.setState({
                    cursorVariant: "logo",
                    isOverProject: true,
                    title: page.data.title,
                    description: page.data.description
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
              <div id="finallogo"> 
                <ParticleCanvas  imageUrl={page.settings?.data.logo.url} isPageTop={false}/>
              </div>   
            </section>
          }
        </motion.div>
    
        {isDesktop && 
          <div style={{position: "fixed", zIndex: -1, bottom: 0, left: 0, right: 0, height: width>600 ? `calc(100% - ${height-foldedHeight+45}px - ${footerOffset*2}px)`: "8rem", backgroundColor: "var(--main-bg-color)"}}>
          </div>
        }

        {isDesktop && 
          <div className={styles.LogoHeader}style={{ width: "100%", position: "fixed", zIndex: 1, top: "0", padding: "0rem 1rem", maxHeight: "4.6rem", minHeight: width<600 ? "60px" : 0,  overflow: "hidden", transition: "opacity 0.0s ease-in", opacity: headerInPosition ? 1 :0, transition: "all 0.1s"}}>
            <img src={Logo.src} alt="logo" style={{width: "calc(100% - 2rem)", objectFit: "stretch"}}/>
          </div>
        }
   

        <div style={{width: "100%", position: "fixed", zIndex: -1, top: 0, bottom:0, backgroundColor: "var(--main-bg-color)", opacity: headerInPosition ? 1 :0, transition: "all 0.1s"}}>
        </div>




      </>
    )
  );
};

export default Page;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });
  const page = await client.getSingle("landing", {});
  
  const settings = await client.getSingle("settings", {});
  page.settings = settings;
  return {
    props: {
      page,
      settings
    },
  };
}
