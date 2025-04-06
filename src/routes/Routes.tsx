import { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import BlogPreview from "../pages/BlogPreview";
import BlogPage from "../pages/BlogPage";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { CryptoLayout } from "../components/CryptoLayout";
import LearnMore from "../pages/learnmore"; // Add this import

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
    // Add the new LearnMore route
    {
      path: "/learn-more",
      element: (
        <Layout>
          <LearnMore />
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