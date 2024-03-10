import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { Navigation } from "../../components/Nav/Navigation";
import { createClient } from "../../prismicio";
import { components } from "../../slices";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Cursor from "../../components/Cursor/Cursor";
import useCursor from "../../components/Resolvers/States/Cursor";
import Gizmo from "../../components/Gizmo/Gizmo";
import GoBack from "../../components/GoBack/GoBack";

import Logo from 'assets/svg/HDSHT_HD.svg';
import Sticky from "@/components/StickyHeader/Sticky";


const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);
  const logoRef = useRef();

  const slice = {};

  slice.primary = {order:"____", title: page.data.title};
  useEffect(() => {
    console.log("work page mounted", page);
    useCursor.setState({ cursor: "default" });
    setIsMounted(true);

    if(page.data.nextwork && page.data.nextwork.url){
      console.log("has next work",page.data.nextwork.url);
      useCursor.setState({ nexturl: page.data.nextwork.url });
    }
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
        <Gizmo />
    
        <Cursor />
        <div className="singleWork">
        <Sticky slice={slice}/>
        <SliceZone
          slices={page.data.slices}
          components={components}
          page={page}
        />    
         <GoBack />
        </div>
        <div ref={logoRef} style={{width: "100%", position: "fixed", zIndex: 0, top: "0", backgroundColor: "var(--main-font-color-highlight)", maxHeight: "5rem", minHeight: "4rem", overflow: "hidden", transition: "opacity 0.01s ease-in", opacity: 1}}>
          <img src={Logo.src} alt="logo" style={{width: "100%"}} />
        </div>
      </>
    )
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("work", params.uid);
  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("work");

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: false,
  };
}
