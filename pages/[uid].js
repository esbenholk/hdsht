import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { Navigation } from "../components/Nav/Navigation";
import Head from "next/head";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cursor from "../components/Cursor/Cursor";
import useCursor from "../components/Resolvers/States/Cursor";
import Gizmo from "../components/Gizmo/Gizmo";
import GoBack from "../components/GoBack/GoBack";
import styles from "./work/style.module.scss"
import Sticky from "@/components/StickyHeader/Sticky";
import Logo from 'assets/svg/HDSHT_HD.svg';
import Loader from "@/components/Loader/Loader";
import useWindowDimensions from "@/components/Resolvers/UseWindowDimensions";


const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState();
  const {width} = useWindowDimensions();

  const slice = {};

  slice.primary = {order:"_", title: page.data.title};

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    // console.log("we made ", page.data.title, page);
    useCursor.setState({ cursor: "default" });
    setIsMounted(true);

    useCursor.setState({
      loaderImage: page.settings.data.placeholderimage.url
    });

    const userAgent = navigator.userAgent;
    const mobile = userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

    setIsDesktop(!mobile);
  }, []);
  return (
    isMounted && (
      <>
        <Head>
          <title>{`HDSHT | ${page.data.title}`}</title>
          <meta name="description" content={page.data.description} />
          <meta name="keywords" content={page.data.keywords} />
          <meta name="author" content="HDSHT" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="UTF-8" />
        </Head>
        {isDesktop ? <><Gizmo />   <Cursor />         <Loader settings={page.settings}/>
        </>:    <Navigation logo={page.settings?.data.logo} links={page.settings?.data.slices[2].items} settings={page.settings}/>}

        <div className={styles.SingleWork}>
        <Sticky slice={slice} isProjectPage={true}/>
        <motion.div        
          className={styles.Container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SliceZone
            slices={page.data.slices}
            components={components}
            page={page}
          />    
        </motion.div>
    
         <GoBack />
        </div>
        {isDesktop && 
          <div style={{width: "100%", position: "fixed", zIndex: 0, top: "0", backgroundColor: "#8daccf", maxHeight: "6.5rem", minHeight: width<600 ? "90px" : 0,  overflow: "hidden", transition: "opacity 0.01s ease-in", padding: "0rem 1rem", transition: "all 0.1s"}}>
             <img src={Logo.src} alt="logo" style={{width: "100%"}}/>
          </div>  
        }
   
      </>
    )
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });
  const page = await client.getByUID("page", params.uid);
  const settings = await client.getSingle("settings", {});
  page.settings = settings;
  
  return {
    props: {
      page,
    },
  };
}



export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType('page', {})

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: false,
  };
}
