import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";

import "../styles/notion.css";
import "../styles/prism.css";
import "katex/dist/katex.min.css";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Layout>
                <NextNProgress />
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}
