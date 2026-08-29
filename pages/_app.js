import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/animate.css'
import '../styles/flaticon.css'
import "../styles/font-awesome.min.css";
import "../styles/themify-icons.css";
import '../styles/sass/style.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from "../store/index";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";
import { LanguageProvider } from "../context/LanguageContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 400 });

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router]);

  return (
    <div>
      <Head>
        <title>Bucare Consulting</title>
        <style>{`
          #nprogress .bar {
            background: #F5A623 !important;
            height: 3px !important;
          }
          #nprogress .peg {
            box-shadow: 0 0 10px #F5A623, 0 0 5px #F5A623 !important;
          }
        `}</style>
      </Head>
      <Provider store={store}>
          <LanguageProvider initialGlobalContent={pageProps?.globalContent || null}>
            <Component {...pageProps} />
            <ToastContainer />
          </LanguageProvider>
      </Provider>
    </div>

  )
}

export default MyApp
