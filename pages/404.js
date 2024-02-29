import Gizmo from "../components/Gizmo/Gizmo";
import Layout from "../components/Layout/Layout";
import Cursor from "../components/Cursor/Cursor";
import Head from "next/head";
export default function Custom404() {
  return (
    <>
      <Head>
        <title>HDSHT | Page Not Found</title>
      </Head>
      <Gizmo />
      <Cursor />
      <Layout>
        <div
          stlye={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10rem",
          }}
        >
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "30rem",
              fontSize: "1rem",
            }}
          >
            This Page does not exist
          </h1>
        </div>
      </Layout>
    </>
  );
}
