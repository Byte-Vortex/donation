import "swiper/css";
import "./globals.css";
import { Cinzel, Urbanist, Open_Sans } from "next/font/google";
import ReactQueryProvider from "./providers/react-query.provider";
import { TopLoader } from "@/components/misc/top-loader";
import { getMetaData } from "./_server/get-meta-data";
import { SeoScripts } from "./seo-scripts";
import { ClientToaster } from "./client-toaster";
import PreLoaderWrapper from '@/components/PreloaderWrapper'
import localFont from "next/font/local";

const headingFont = localFont({
  src: "./fonts/Segment-Bold.otf",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const heroFont = localFont({
  src: "./fonts/Segment-Medium.otf",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hero',
})

const normalFont = localFont({
  src: "./fonts/Segment-Medium.otf",
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-normal',
})

export const revalidate = 600;


export async function generateMetadata(props, state) {

  //This is a hack to get the current pathname
  //More about this from here: https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262
  const res = Object.getOwnPropertySymbols(state || {})
    .map(p => state[p])
    .find(state => state?.hasOwnProperty?.("urlPathname"))
  const pathname = res?.urlPathname.replace(/\?.+/, "")

  const metadata = await getMetaData(pathname === "/" ? "global" : pathname);
  return {
    alternates: {
      canonical: "./",
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE_URL),
    ...metadata
  }
}


export default function RootLayout({ children }) {
  return (
    <ReactQueryProvider>
      <html lang="en" className={`${headingFont.variable} ${heroFont.variable} ${normalFont.variable}`}>
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </head>
        <body className="bg-background text-foreground font-Normal selection:text-background selection:bg-foreground/80 text-base">
          <SeoScripts />
          <PreLoaderWrapper>
          {children}
          <ClientToaster />
          <TopLoader showSpinner={false} />
          </PreLoaderWrapper>
        </body>
      </html>
    </ReactQueryProvider>
  );
}
