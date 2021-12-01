// import App from './App';
import Menu from './components/Layout/Content/Menu/Menu';
import Cart from './components/Layout/Content/Cart/Cart';
import Content from './components/Layout/Content/Content';
import Login from './components/Layout/Content/Login/Login';
import Admin from './components/Layout/Content/admin/Admin';
import Track from './components/Layout/Content/Track/Track';
import Checkout from './components/Layout/Content/Checkout/Checkout';

// import Checkout from './components/Layout/Content/Checkout';
const routes = [
    {
      path: "/menu",
      component: Menu
    },
    {
        path: "/cart",
        component: Cart
    },
    {
      path: "/checkout",
      component: Checkout
    },
     {
        path: "/login",
        component: Login,
      },
      {
        path: "/admin",
        component: Admin,
      },
      {
        path: "/track",
        component: Track,
      },
     {
      path: "/",
      component: Content
    },
  ];

  export default routes;