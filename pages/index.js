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
import ClientLogoGrid from "../components/ClientLogoGrid/ClientLogoGrid";
import dynamic from "next/dynamic";
import DateTime from "../components/DateTime/DateTime";
import HighlightExclusion from "../components/HighlightExclusion/HighlightExclusion";
import { useFooterOffset } from "../components/Resolvers/States/FooterOffset";
import useWindowDimensions from "../components/Resolvers/UseWindowDimensions"

const Gizmo = dynamic(() => import("../components/Gizmo/Gizmo"), {
  ssr: false,
});

const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [foldedHeight, setFoldedHeight] = useState(0);

  useEffect(() => {
    console.log("New Page Comp mounted", page.data.slices);
    let foldedHeight_temp = 0;
    for (let index = 0; index < page.data.slices.length; index++) {
      const slice = page.data.slices[index];
      if(slice.slice_type === "sticky_header" || slice.slice_type === "credit_footer" || slice.slice_type === "cookie_footer" ){
        foldedHeight_temp += 55;
        console.log("has sticky header", slice);
      }
    }
    setFoldedHeight(foldedHeight_temp);
    setIsMounted(true);
    useCursor.setState({ cursor: "default" });
    console.log("footer offset", footerOffset, height, foldedHeight_temp, foldedHeight, width);

  }, []);

  const { footerOffset } = useFooterOffset();
  const {height, width} = useWindowDimensions();


  


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
        <Gizmo />
        <Cursor />
        {/* <HighlightExclusion /> */}
        <motion.div
          className={styles.Container}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
      
            marginTop: `calc(${height-foldedHeight}px - ${footerOffset}px)`,
          }}
        >
          <SliceZone slices={page.data.slices} components={components} />
        </motion.div>
      </>
    )
  );
};

export default Page;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });


  const page = await client.getSingle("landing", {

  })



  return {
    props: {
      page,
    },
  };
}
