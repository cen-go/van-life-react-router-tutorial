import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import VansPage, { loader as vansPageLoader} from "./pages/VansPage";
import VanDetails, {loader as vanDetailLoader} from "./pages/VanDetails";
import HostLayout from "./components/HostLayout";
import Dashboard, {loader as dashboardLoader} from "./pages/Host/Dashboard";
import Income, {loader as incomeLoader} from "./pages/Host/Income";
import Reviews, {loader as reviewsLoader} from "./pages/Host/Reviews";
import HostVans, {loader as hostVansLoader} from "./pages/Host/HostVans";
import HostVanDetail, {loader as hostVanDetailLoader} from "./pages/Host/HostVanDetail";
import HostVanInfo, {loader as hostVanInfoLoader} from "./pages/Host/HostVanInfo";
import HostVanPricing, {loader as hostVanPricingLoader} from "./pages/Host/HostVanPricing";
import HostVanPhotos, {loader as hostVanPhotosLoader} from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error"

import "./server";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "*", element: <NotFound />},
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "vans", element: <VansPage />, loader: vansPageLoader, errorElement: <Error />, },
      { path: "vans/:vanId", element: <VanDetails />, loader: vanDetailLoader },
      {
        path: "host",
        element: <HostLayout />,
        children: [
          { index: true, element: <Dashboard />, loader: dashboardLoader },
          { path: "income", element: <Income />, loader: incomeLoader },
          { path: "reviews", element: <Reviews />, loader: reviewsLoader },
          { path: "vans", element: <HostVans />, loader: hostVansLoader },
          {
            path: "vans/:vanId",
            element: <HostVanDetail />,
            loader: hostVanDetailLoader,
            children: [
              { index: true, element: <HostVanInfo />, loader: hostVanInfoLoader },
              { path: "pricing", element: <HostVanPricing />, loader: hostVanPricingLoader },
              { path: "photos", element: <HostVanPhotos />, loader: hostVanPhotosLoader },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );

  // return (
  //   <>
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<Layout />}>
  //           <Route index element={<Home />} />
  //           <Route path="about" element={<About />} />
  //           <Route path="vans" element={<VansPage />} />
  //           <Route path="vans/:vanId" element={<VanDetails />} />
  //           <Route path="host" element={<HostLayout />}>
  //             <Route index element={<Dashboard />} />
  //             <Route path="income" element={<Income />} />
  //             <Route path="reviews" element={<Reviews />} />
  //             <Route path="vans" element={<HostVans />} />
  //             <Route path="vans/:vanId" element={<HostVanDetail />}>
  //               <Route index element={<HostVanInfo />} />
  //               <Route path="pricing" element={<HostVanPricing />} />
  //               <Route path="photos" element={<HostVanPhotos />} />
  //             </Route>
  //           </Route>
  //           <Route path="*" element={<NotFound />} />
  //         </Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </>
  // );
}

export default App;
