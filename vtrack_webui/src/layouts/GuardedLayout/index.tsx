import Head from "next/head";

import { IProps } from "./types";
import { Footer, NavBar } from "@/components";
import { Browser } from "@/constants";

export default function GuardedLayout(props: IProps): JSX.Element {
  return <div>
    <Head>
        <title>{props.title}</title>
        <link rel="icon" href={Browser.FAVICON}/>
    </Head>
    <div>
        <NavBar></NavBar>
    </div>
    <Footer />
  </div>;
}
