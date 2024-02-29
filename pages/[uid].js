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

const Page = ({ page }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("page mounted");
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
        <Cursor />
        <GoBack />
        <Layout>
          <SliceZone slices={page.data.slices} components={components} />
        </Layout>
      </>
    )
  );
};

export default Page;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", params.uid);
  console.log("STATIC PATH", page)
  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  // const pages = await client.getAllByType("page");

  const pages = await client.getAllByType('page', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    lang: 'en-us',
  })
  console.log("STATIC PATH", pages)

  return {
    paths: pages.map((page) => prismicH.asLink(page)),
    fallback: false,
  };
}
