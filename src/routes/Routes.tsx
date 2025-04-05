import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import BlogPreview from "../pages/BlogPreview";
import BlogPage from "../pages/BlogPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { CryptoLayout } from "../components/CryptoLayout";


const Routes = () => {

  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/wallet",
      element: (
        <Layout>
          <CryptoLayout />
        </Layout>
      ),
    },
    {
      path: "/blogs",
      element: (
        <Layout>
          <BlogPage />
        </Layout>
      ),
    },
    {
      path: "/blogs/:blogId",
      element: (
        <Layout>
            <BlogPreview />
        </Layout>
      ),
    
    },
    {
      path: "*",
      element: (
        <Layout>
          <NotFound />
        </Layout>
      ),
    },
  ];

  return routes;
};

export default Routes;

// import { JSX } from "react";
// import { EthWallet } from "../components/eth_wallet";
// import useMnemonicCall from "../components/mnemonic";

// export interface RouteType {
//   path: string;
//   element: JSX.Element;
//   isPrivate?: boolean;  // for future protected routes
// }

// const { mnemonic }: { mnemonic: string } = useMnemonicCall();

// const routes: RouteType[] = [
//   {
//     path: "/",
//     element: <EthWallet mnemonic={mnemonic}/>,
//   },

// ];

// export default routes;
