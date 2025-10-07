import Admin from "./pages/AdminPage";
import Basket from "./pages/BasketPage/BasketPage";
import Shop from "./pages/ShopPage";
import Auth from "./pages/AuthPage";
import DevicePage from "./pages/DevicePage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  DEVICE_ROUTE,
} from "./utils/consts";

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
];

export const adminRoute = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];
