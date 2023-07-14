import Head from "next/head";

import { Browser } from "@/constants";
import Footer from "@/components/Footer";
import LandingContainer from "@/containers/LandingContainer";

export default function Home(): JSX.Element {
  return (
    <>
    <Head>
      <title>vTrack | Innova Solutions</title>
      <meta
          name="description"
          content="vTrack got tracking of visitors."
        />
        <link rel="icon" href={Browser.FAVICON} />
    </Head>
      <main>
        <LandingContainer />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
