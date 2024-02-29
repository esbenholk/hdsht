import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { Navigation } from "../../components/Nav/Navigation";
import { createClient } from "../../prismicio";
import { components } from "../../slices";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cursor from "../../components/Cursor/Cursor";
import useCursor from "../../components/Resolvers/States/Cursor";
import Gizmo from "../../components/Gizmo/Gizmo";
import GoBack from "../../components/GoBack/GoBack";




const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("work page mounted");
    useCursor.setState({ cursor: "default" });
    setIsMounted(true);
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
        <GoBack />
        <Cursor />
        <SliceZone
          slices={page.data.slices}
          components={components}
          page={page}
        />
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
