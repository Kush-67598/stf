import { useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Footer from "../components/Footer";
import  { useRouter } from "next/router";
import { Advent_Pro } from 'next/font/google';

const custom = Advent_Pro({
  subsets: ['latin'],
  weight: ['500'], // Choose weights as needed
  variable: '--font-custom',
});
function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const isadmin = router.pathname.startsWith("/admin");



  return (
    <>
      <main className={custom.className}>
        {!isadmin && <Navbar />}

        <Component
          {...pageProps}
        />
        {!isadmin && <Footer />}
      </main>
    </>
  );
}
export default MyApp;
